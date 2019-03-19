---
layout: post
title:  "Online Voice Chat"
categories: JavaScript
description: 在线即时语音聊天
---

## 创建录音机对象

```js
audioContext = window.AudioContext || window.webkitAudioContext;
context = new audioContext();
config = {
    inputSampleRate: context.sampleRate,//输入采样率,取决于平台
    inputSampleBits: 16,//输入采样数位 8, 16
    outputSampleRate: 44100 / 6,//输出采样率
    outputSampleBits: 8,//输出采样数位 8, 16
    channelCount: 2,//声道数
    cycle: 500,//更新周期,单位ms
    volume: _config.volume || 1 //音量
};
var bufferSize = 4096;//缓存大小
//创建“录音机对象”
recorder = context.createScriptProcessor(bufferSize, config.channelCount, config.channelCount); // 第二个和第三个参数指的是输入和输出的声道数
buffer = [];//音频数据缓冲区
bufferLength = 0;//音频数据缓冲区长度
２. 将音频输入和“录音机对象”关联

//通过音频流创建输入音频对象
audioInput =　context.createMediaStreamSource(stream);//stream即getUserMedia成功后得到的流
//设置录音机录音处理事件，每次缓存（上一步中）满了执行回调函数，
recorder.onAudioProcess = function(e) {
    var inputBuffer = e.inputBuffer,
        channelCount = inputBuffer.numberOfChannels,
        length = inputBuffer.length;
    channel = new Float32Array(channelCount * length);
    for (var i = 0; i < length; i++) {
        for (var j = 0; j < channelCount; j++) {
            channel[i * channelCount + j] = inputBuffer.getChannelData(j)[i];
        }
    }
    buffer.push(channel);//缓存数据存入音频缓冲区
    bufferLength += channel.length;
};
// 创建 '音量对象'，作为 '音频输入' 和 '录音机对象' 连接的桥梁
volume = context.createGain();
audioInput.connect(volume);
volume.connect(recorder);
// 当然也可以不通过 '音量对象' 直连 '录音机'，但不能同时使用两种方式
// audioInput.connect(this.recorder);
recorder.connect(context.destination);//context.destination为音频输出
//连接完就开始执行onaudioprocess方法
//recorder.disconnect()可以停止“录音”
updateSource(callback);
```

> 麦克风的输入都已经连接至“录音机对象”，“录音机对象”再将数据不断存入缓冲区，所以要得到稳定的“音频流”（不是真正意义上的流）可以以一定时间间隔（１秒）提取以此缓冲区的数据转为一秒时长的音频文件，将之通过audio控件播放即可。注意，这样处理会导致声音有１秒的延迟，可以减少这个时间间隔接近“实时”的效果。

## 压缩数据

```js
function compress() { //合并压缩
    //合并
    var buffer = this.buffer,
        bufferLength = this.bufferLength;
    this.buffer = []; //将缓冲区清空
    this.bufferLength = 0;
    var data = new Float32Array(bufferLength);
    for (var i = 0, offset = 0; i < buffer.length; i++) {
        data.set(buffer[i], offset);
        offset += buffer[i].length;
    }
    //根据采样频率进行压缩
    var config = this.config,
        compression = parseInt(config.inputSampleRate / config.outputSampleRate),
        //计算压缩率
        length = parseInt(data.length / compression),
        result = new Float32Array(length);
    index = 0;
    while (index < length) {
        result[index] = data[index++ * compression];
    }
    return result;//合并压缩后的数据
}
```

## 将获得的数据构成wav文件

```js
function encodeWAV(bytes) {
    var config = this.config,
        sampleRate = Math.min(config.inputSampleRate, config.outputSampleRate),
        sampleBits = Math.min(config.inputSampleBits, config.oututSampleBits),
        dataLength = bytes.length * (sampleBits / 8),
        buffer = new ArrayBuffer(44 + dataLength),
        view = new DataView(buffer),
        channelCount = config.channelCount,
        offset = 0,
        volume = config.volume;

    writeUTFBytes = function(str) {
        for (var i = 0; i < str.length; i++) {
            view.setUint8(offset + i, str.charCodeAt(i));
        }
    };
    // 资源交换文件标识符 
    writeUTFBytes('RIFF');
    offset += 4;
    // 下个地址开始到文件尾总字节数,即文件大小-8 
    view.setUint32(offset, 44 + dataLength, true);
    offset += 4;
    // WAV文件标志
    writeUTFBytes('WAVE');
    offset += 4;
    // 波形格式标志 
    writeUTFBytes('fmt ');
    offset += 4;
    // 过滤字节,一般为 0x10 = 16 
    view.setUint32(offset, 16, true);
    offset += 4;
    // 格式类别 (PCM形式采样数据) 
    view.setUint16(offset, 1, true);
    offset += 2;
    // 通道数 
    view.setUint16(offset, channelCount, true);
    offset += 2;
    // 采样率,每秒样本数,表示每个通道的播放速度 
    view.setUint32(offset, sampleRate, true);
    offset += 4;
    // 波形数据传输率 (每秒平均字节数) 单声道×每秒数据位数×每样本数据位/8 
    view.setUint32(offset, channelCount * sampleRate * (sampleBits / 8), true);
    offset += 4;
    // 快数据调整数 采样一次占用字节数 单声道×每样本的数据位数/8 
    view.setUint16(offset, channelCount * (sampleBits / 8), true);
    offset += 2;
    // 每样本数据位数 
    view.setUint16(offset, sampleBits, true);
    offset += 2;
    // 数据标识符 
    writeUTFBytes('data');
    offset += 4;
    // 采样数据总数,即数据总大小-44 
    view.setUint32(offset, dataLength, true);
    offset += 4;
    // 写入采样数据 
    if (sampleBits === 8) {
        for (var i = 0; i < bytes.length; i++, offset++) {
            var val = bytes[i] * (0x7FFF * volume);
            val = parseInt(255 / (65535 / (val + 32768)));
            view.setInt8(offset, val, true);
        }
    } else if (sampleBits === 16) {
        for (var i = 0; i < bytes.length; i++, offset += 2) {
            var val = bytes[i] * (0x7FFF * volume);
            view.setInt16(offset, val, true);
        }
    }
    return new Blob([view], {
        type: 'audio/wav'
    });
}
```

## 每次缓冲区资源达到阈值时，发送

```js
function updateSource(callback) {
    var blob = encodeWAV(this.compress());
    var audio= document.getElementById("audio");
    //对上一秒播放的音频源进行释放
    var url = audio.src;
    url && window.URL.revokeObjectURL(url);
    if (blob.size > 44) { //size为44的时候，数据部分为空
        audio.src = window.URL.createObjectURL(blob);
    }
    setTimeout(function() {
        updateSource(callback);
    }, config.cycle);
}
```