public class Solution {
    public int findPoisonedDuration(int[] timeSeries, int duration) {
        if (timeSeries.length < 1){
            return 0;
        }
        int poisonedtime = duration;
        int duplicate = 0;
        for(int i=1;i<timeSeries.length;i++){
            poisonedtime += duration;
            if( timeSeries[i]-timeSeries[i-1] < duration){
                duplicate += duration - (timeSeries[i]-timeSeries[i-1]);
            }
        }
        return poisonedtime - duplicate;
    }
}