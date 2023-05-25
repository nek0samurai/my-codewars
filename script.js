
//====================___№1__=========================//

//You are the "computer expert" of a local Athletic Association (C.A.A.). Many teams of runners come to compete. Each time you get a string of all race results of every team who has run. For example here is a string showing the individual results of a team of 5 runners:

//"01|15|59, 1|47|6, 01|17|20, 1|32|34, 2|3|17"

//Each part of the string is of the form: h|m|s where h, m, s (h for hour, m for minutes, s for seconds) are positive or null integer (represented as strings) with one or two digits. Substrings in the input string are separated by ,  or ,.

//To compare the results of the teams you are asked for giving three statistics; range, average and median.

//Range : difference between the lowest and highest values. In {4, 6, 9, 3, 7} the lowest value is 3, and the highest is 9, so the range is 9 − 3 = 6.

//Mean or Average : To calculate mean, add together all of the numbers and then divide the sum by the total count of numbers.

//Median : In statistics, the median is the number separating the higher half of a data sample from the lower half. The median of a finite list of numbers can be found by arranging all the observations from lowest value to highest value and picking the middle one (e.g., the median of {3, 3, 5, 9, 11} is 5) when there is an odd number of observations. If there is an even number of observations, then there is no single middle value; the median is then defined to be the mean of the two middle values (the median of {3, 5, 6, 9} is (5 + 6) / 2 = 5.5).

//Your task is to return a string giving these 3 values. For the example given above, the string result will be

//"Range: 00|47|18 Average: 01|35|15 Median: 01|32|34"

//of the form: "Range: hh|mm|ss Average: hh|mm|ss Median: hh|mm|ss"`

//where hh, mm, ss are integers (represented by strings) with each 2 digits.

//Remarks:
//if a result in seconds is ab.xy... it will be given truncated as ab.
//if the given string is "" you will return ""


//-------------SOLUTION-------------

function stat(strg) {
  if (strg == '') {
    return '';
  } else {
    const arrOfSec = [];
    const arrOfNum = strg.split(', ');

    for (i = 0; i < arrOfNum.length; i++) {
      const eachPlayerValue = arrOfNum[i];

      const [hours, minutes, seconds] = eachPlayerValue.split('|').map(Number);
      const totalSec = hours * 3600 + minutes * 60 + seconds;
      arrOfSec.push(totalSec);
    }

    const arrOfValues = [];

    const findMedian = (data) => {
      arrOfSec.sort((a, b) => a - b);
      if (data.length % 2) {
        return data[Math.floor(data.length / 2)];
      } else {
        return (data[data.length / 2] + data[data.length / 2 - 1]) / 2;
      }
    };

    const handleValues = () => {
      convertIntoTime(Math.max(...arrOfSec) - Math.min(...arrOfSec));
      convertIntoTime(Math.floor(arrOfSec.reduce((a, b) => a + b) / arrOfSec.length));
      convertIntoTime(findMedian(arrOfSec));
    };

    const convertIntoTime = (value) => {
      let time = new Date(value * 1000)
        .toISOString()
        .substring(11, 19)
        .split(':')
        .join('|')
        .toString();
      arrOfValues.push(time);
    };

    handleValues();

    const [range, average, median] = arrOfValues;

    return `Range: ${range} Average: ${average} Median: ${median}`;
  }
}

stat('01|15|59, 1|47|16, 01|17|20, 1|32|34, 2|17|17');



//====================___№2__=========================//


//Scheduling is how the processor decides which jobs (processes) get to use the processor and for how long. This can cause a lot of problems. Like a really long process taking the entire CPU and freezing all the other processes. One solution is Round-Robin, which today you will be implementing.

//Round-Robin works by queuing jobs in a First In First Out fashion, but the processes are only given a short slice of time. If a processes is not finished in that time slice, it yields the proccessor and goes to the back of the queue.

//For this Kata you will be implementing the

//   function roundRobin(jobs, slice, index)
//It takes in:

//1. "jobs" a non-empty positive integer array. It represents the queue and clock-cycles(cc) remaining till the job[i] is finished.

//2. "slice" a positive integer. It is the amount of clock-cycles that each job is given till the job yields to the next job in the queue.

//3. "index" a positive integer. Which is the index of the job we're interested in.
//roundRobin returns:

//1. the number of cc till the job at index is finished.
//Here's an example:

//roundRobin([10,20,1], 5, 0) 
//at 0cc [10,20,1] jobs[0] starts
//after 5cc [5,20,1] jobs[0] yields, jobs[1] starts
//after 10cc [5,15,1] jobs[1] yields, jobs[2] starts
//after 11cc [5,15,0] jobs[2] finishes, jobs[0] starts
//after 16cc [0,15,0] jobs[0] finishes
//so:

//roundRobin([10,20,1], 5, 0) == 16
//**You can assume that the processor can switch jobs between cc so it does not add to the total time.


//=============SOLUTION=============


function roundRobin(jobs, slice, index) {
  let sum = 0;

  while (jobs[index]) {
    for (i = 0; i < jobs.length; i++) {
      if (jobs[i] < slice) {
        sum += jobs[i];
        jobs[i] = 0;
      } else {
        jobs[i] -= slice;
        sum += slice;
      }

      if (jobs[index] === 0) {
        console.log(sum);
        return sum;
      }
    }
  }
}

roundRobin([19, 5, 10, 6, 1], 8, 4);





