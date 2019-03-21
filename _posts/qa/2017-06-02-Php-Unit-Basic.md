---
layout: post
title: "Basic of Php Unit"
categories: QA
description: PhpUnit 的简单用法
---

简单来说, 单元测试就是摆脱复杂 debug 从小组件入手的测试, 对于 php 来说一个好用的工具就是 phpUnit

# Php Unit 的简单用法

## 基础语法

以下是其中一个例子

```php
assertTrue(true);   # SUCCESSFUL
assertEquals('orz', 'oxz', 'The string is not equal with orz');   #UNSUCCESSFUL
assertCount(1, array('Monday'));   # SUCCESSFUL
assertContains('PHP', array('PHP', 'Java', 'Ruby'));   # SUCCESSFUL
```
需要知道的是中途遇到问题会断掉.  
这些方法名自然不必多说了, 其中任何方法都可以在后面放置一个额外传入变量来指定输出.

## 简单测试

这里举例一个测试用户, 活动之间关系的测试代码

```php
class User
{
    public $id;
    public $name;
    public $email;
    
    public function __construct($id, $name, $email)
    {
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
    }
}
class Event
{
    public $id;
    public $name;
    public $start_date;
    public $end_date;
    public $deadline;
    public $attendee_limit;
    public $attendees = array();
    
    public function __construct($id, $name, $start_date, $end_date, $deadline, $attendee_limit)
    {
        $this->id = $id;
        $this->name = $name;
        $this->start_date = $start_date;
        $this->end_date = $end_date;
        $this->deadline = $deadline;
        $this->attendee_limit = $attendee_limit;
    }
    
    public function reserve($user)
    {
        $this->attendees[$user->id] = $user;
    }
    
    public function getAttendeeNumber()
    {
        return sizeof($this->attendees);
    }
}
```

我们用以下的代码进行测试

```php
require_once('../src/phpunitdemo/UserDemo.php');
require_once('../src/phpunitdemo/EventDemo.php');

class EventTest extends PHPUnit_Framework_TestCase
{
    public function testReserve()
    {
        
        $eventId = 1;
        $eventName = '活動1';
        $eventStartDate = '2014-12-24 18:00:00';
        $eventEndDate = '2014-12-24 20:00:00';
        $eventDeadline = '2014-12-23 23:59:59';
        $eventAttendeeLimit = 10;
        $event = new Event($eventId,
        $eventName, $eventStartDate, $eventEndDate,
        $eventDeadline, $eventAttendeeLimit);
        
        $userId = 1;
        $userName = 'User1';
        $userEmail = '
        user1@test.org ';
        $user = new User($userId, $userName, $userEmail);
        $event->reserve($user);
        
        $expectedNumber = 1;
        $this->assertEquals($expectedNumber, $event->getAttendeeNumber());
        $this->assertContains($user, $event->attendees);
    }
}
```

这样我们就可以通过多个测试来逐个测试class。
