import { fetchBooks, fetchPoets, fetchBook } from './axios.js';
import moment from 'moment';
//import * from './axios.js';

function createCrowdsourceGraph(filteredPoets, graphml) {
  console.log('gathering list of weights..');
  console.log('list of filtered poets: ', filteredPoets);
  const listOfWeights =
    graphml.graph.edge.reduce((filtered, edge) => {
      if (filteredPoets[edge._attributes.source] &&
        filteredPoets[edge._attributes.target]) {
        const toPush = {
          source: edge._attributes.source,
          target: edge._attributes.target,
          weight: edge.data._text,
        };
        filtered.push(toPush);
      }
      return filtered;
    }, []);
  return listOfWeights;
}

function createAllTimelineItems() {
  console.log('createAllTimelineItems');
  return new Promise((fulfill, reject) => {
    const timelineItems = [];
    fetchPoets()
    .then((res) => {
      res.data.forEach(poet => {
        console.log('poet: ', poet.name);

        const mySort = getAllBooksForPoet(poet).then((toSort) => {
          const sorted = toSort.sort((a, b) => {
            console.log('here is a: ', a);
            console.log('here is b: ', b);
            return moment.utc(a.first_publish_year).diff(moment.utc(b.first_publish_year));
        });

        });
        console.log('first in sorted list: ', mySort[0]);
        console.log('last in sorted list: ', mySort[poet.books.length - 1]);

      });  // forEach

      //  timelineItems.push({id: poet._id, content: poet.name, className:'sampleItem', start: moment('2013-04-20'), end: moment('2013-04-21')});
      })
  });

  }

function getAllBooksForPoet(poet) {
  return new Promise((fulfill, reject) => {
    const promiseArray = [];
      poet.books.forEach((book) => {
      promiseArray.push(new Promise((fulfill2, reject) => {
        fetchBook(book)
        .then((res) => {
          fulfill2(book);
        })
        .catch((err) => {
          console.log(err);
          reject(book);
        })
    }));
  });
  Promise.all(promiseArray)
  .then(res => {fulfill(res);})
  .catch(err => {reject(err);})
});
}


export {createAllTimelineItems}
