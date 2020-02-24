const keepsHisWord = true;
const promise1 = new Promise( (res, rej) => {
	if(keepsHisWord) { 
		res("The man likes to keep his word");
	}
	
	else {
		rej("This man doesn't want to keep his word");
	}
}); 

console.log(promise1);

// const promise2 = new Promise( (res, rej) => {
// 	setTimeout( () => {
// 		res({
// 			message: "The man likes to keep his word", 
// 			code: "aManKeepsHisWord"
// 		}); 
// 	}, 5 * 1000);
// }); 

// console.log(promise2);
// console.log(promise2.message);

const momsPromise = new Promise( (res, rej) => {
	let momsSavings = 200000;
	let priceOfPhone = 60000;
	
	if(momsSavings > priceOfPhone) {
		res({
			brand: 'Iphone', 
			model: '6s'
		});		
	}
	
	else {
		rej("We don't have enough money. Let us save some more");
	}
});

momsPromise
	.then( (value) => console.log('Hurray, I got this phone as a gift', JSON.stringify(value)))
	.catch( (reason) => console.log("Mom couldn't buy me a the phone because ", reason))
	.finally( () => console.log("Irrespective of wether my mom can buy me a phone or not, I still love her"));


const getRandomNumber = (start = 1, end = 10) => {
	return (parseInt(Math.random() * end) % (end - start + 1) + start);
}

const promiseTRRARNOSG = (promisethatResolvesRandomlyAfterRandomNumberOfSecondsGenerator) => {
	return new Promise( (res, rej) => {
		let randomNumberOfSeconds = getRandomNumber(2, 10);
		setTimeout( ( ) => {
			let randomizeResolving = getRandomNumber(1, 10);
			if(randomNumberOfSeconds > 5) {
				res({
					randomNumberOfSeconds: randomNumberOfSeconds,
					randomizeResolving: randomizeResolving
				});
			}

			else {
				rej({
					randomNumberOfSeconds: randomNumberOfSeconds, 
					randomizeResolving: randomizeResolving
				});
			}
		}, randomNumberOfSeconds * 1000);
	});
};

// const testPromise = promiseTRRARNOSG();

// testPromise
// 	.then( (value) => console.log("Value when promise is resolved: ", value))
// 	.catch( (reason) => console.log("Reason promise is rejected: ", reason))

// let promise = promiseTRRARNOSG();

// for(let i = 1; i <= 10; i++){
// 	promise	
// 		.then( (value) => console.log("Value when promise is resolved: ", value))
// 		.catch( (reason) => console.log("Reason promise is rejected: ", reason))
// }

var promise4 = Promise.resolve(1);
promise4
	.then( value => {
			console.log("This will run as it is a resolved promise. The resolved value is ", value)
			return value;
})
	.then( value => console.log('This will also run as multiple handlers can be added. Printing twice the resovled value which is: ', value * 2))
	.catch( reason => console.log(`This will not run as it is a resolved promise: ${reason}`));


// .all and .race

const promiseTRSANSG = (promiseThatResolvesAfterNSecondsGenerator = function(n = 0) {
  return new Promise ((res, rej) => {
    setTimeout( () => {
      res({
        resolvedAfterNSeconds: n
      }); 
    }, n * 1000);
  });
});

const promiseTRJANSG = (promiseThatRejectsAfterNSecondsGenerator = function(n=0){
  return new Promise((res, rej) => {
    setTimeout( () => {
      rej({
        rejectedAfterNSeconds: n
      });
    }, n * 1000);                   
  });
});

// Case 1: when all promises are resolved. This is the most frequent case
  // All promises are run in parallel as evidenced by the fact that the output doesn't change order despite the third argument taking longer than the second.
  // the order of the promises are maintained in the value
console.time("Promises.All");
const promisesArray = [];
promisesArray.push(promiseTRSANSG(1));
promisesArray.push(promiseTRSANSG(4));
promisesArray.push(promiseTRSANSG(2));

const handleAllPromises = Promise.all(promisesArray);
handleAllPromises
  .then(values => {
    console.timeEnd('Promises.All');
    console.log('All the promises are resolved', values);
  })
  .catch(reason => {
    console.log("One of the promises failed with the following reason: ", reason);
  })

// case 2: when there are no promises
console.time("Promises2.All");
const promisesArray2 = [];
promisesArray2.push(1);
promisesArray2.push(4);
promisesArray2.push(2);

const handleAllPromises2 = Promise.all(promisesArray2);
handleAllPromises2
  .then(values => {
    console.timeEnd('Promises2.All');
    console.log('All the promises are resolved', values);
  })
  .catch(reason => {
    console.log("One of the promises failed with the following reason: ", reason);
  })

// Case 3: it rejects with the reason of the first promise that rejects
console.time("Promises3.All");
const promisesArray3 = [];
promisesArray3.push(promiseTRSANSG(1));
promisesArray3.push(promiseTRSANSG(4));
promisesArray3.push(promiseTRSANSG(1));
promisesArray3.push(promiseTRJANSG(2));

const handleAllPromises3 = Promise.all(promisesArray3);
handleAllPromises3
  .then(values => {
    console.timeEnd('Promises.All');
    console.log('All the promises are resolved', values);
  })
  .catch(reason => {
    console.log("One of the promises failed with the following reason: ", reason);
  })

// Promise.race(iterable)

// case 1: one of the promises resolves first
console.time("Promises1.race");
const promisesRaceArray1 = [];
promisesRaceArray1.push(promiseTRSANSG(4));
promisesRaceArray1.push(promiseTRSANSG(3));
promisesRaceArray1.push(promiseTRSANSG(2));  // this will win the race
promisesRaceArray1.push(promiseTRSANSG(3));
promisesRaceArray1.push(promiseTRSANSG(4));

const promisesRace1 = Promise.race(promisesRaceArray1);
promisesRace1
  .then(values => {
    console.timeEnd("Promises1.race");
    console.log('The fastest promise resolved in', values);
  })
  .catch(reason => {
    console.timeEnd("Promises1.race");
    console.log('The fastest promise rejected with the following reason', reason);
  })

// case 2: one of the promises rejects first
console.time('Promises2.race');
const promisesRaceArray2 = [];
promisesRaceArray2.push(promiseTRSANSG(4));
promisesRaceArray2.push(promiseTRSANSG(6));
promisesRaceArray2.push(promiseTRJANSG(3)); // winner winner chicken dinner
promisesRaceArray2.push(promiseTRSANSG(5));
promisesRaceArray2.push(promiseTRSANSG(4));
const promisesRace2 = Promise.race(promisesRaceArray1);
promisesRace2
  .then(values => {
    console.timeEnd("Promises2.race");
    console.log('The fastest promise resolved in', values);
  })
  .catch(reason => {
    console.timeEnd("Promises2.race");
    console.log('The fastest promise rejected with the following reason', reason);
  })