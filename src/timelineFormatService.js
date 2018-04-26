import { fetchPoetByName, fetchBooks, fetchPoets, fetchBook } from './axios.js';
import moment from 'moment';
// import * from './axios.js';

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

function getAllBooksforPoetsWrapper() {
  console.log('createAllTimelineItems');
  return new Promise((fulfill, reject) => {
    const timelineItems = [];
    fetchPoets()
      .then((res) => {
        res.data.forEach((poet) => {
          timelineItems.push(new Promise((fulfill2, reject2) => {
            console.log('poet: ', poet.name);

            getAllBooksForPoet(poet).then((toSort) => {
              console.log('toSort: ', toSort);
              fulfill2(toSort);
            });
          })); // promise
        }); // forEach
        Promise.all(timelineItems).then((cleanedItems) => {
          console.log('have cleaned all items: ', cleanedItems);
          fulfill(cleanedItems);
          //    });
          //  timelineItems.push({id: poet._id, content: poet.name, className:'sampleItem', start: moment('2013-04-20'), end: moment('2013-04-21')});
        });
      });
  });
}

function formatTimelineIntoData(allBooksAllPoets) {
  return new Promise((fulfill, reject) => {
    const myDataset = [];
    allBooksAllPoets.forEach((poetsBooks) => {
      myDataset.push(new Promise((fulfill2, reject2) => {
        const sorted = sortBooks(poetsBooks);
        console.log('result of sorted: ', sorted);
        const firstBook = findElement(sorted, 0);
        const lastBook = findElement(sorted, (sorted.length - 1));

        const firstBookYear = moment(firstBook.first_publish_year);
        const lastBookYear = moment(lastBook.first_publish_year);

        fetchPoetByName(firstBook.author).then((res, err) => {
          console.log('res looks like: ', res);
          fulfill2({
            id: res.data.id, content: res.data.name, className: 'sampleItem', start: firstBookYear, end: lastBookYear,
          });
        });
      }));
    });
    Promise.all(myDataset).then((finishedDataset) => {
      fulfill(finishedDataset);
    });
  });
}

function getAllBooksForPoet(poet) {
  return new Promise((fulfill, reject) => {
    const promiseArray = [];
    poet.books.forEach((book) => {
      promiseArray.push(new Promise((fulfill2, reject) => {
        fetchBook(book)
          .then((res) => {
            console.log('res is: ', res);
            fulfill2(res.data);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      }));
    });
    Promise.all(promiseArray)
      .then((res) => { fulfill(res); })
      .catch((err) => { reject(err); });
  });
}

function sortBooks(toSort) {
  console.log('sorting2: ', toSort.length);
  const sorted = toSort.sort((a, b) => {
    return moment.utc(a.first_publish_year).diff(moment.utc(b.first_publish_year));
  });
  return sorted;
}

function findElement(toSearch, index) {
  const foundBook = toSearch.find((e) => {
    return e.id === toSearch[index].id;
  });
  return foundBook;
}


export { getAllBooksforPoetsWrapper, formatTimelineIntoData, sortBooks, findElement };
