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

function getAllBooksforPoetsWrapper2() {
  console.log('getAllBooksforPoetsWrapper2');
  return new Promise((fulfill, reject) => {
    fetchPoets()
      .then((res) => {
        fetchBooks()
          .then((res2) => {
            const response = {
              poets: res,
              books: res2,
            };
            fulfill(response);
          });
      });
  });
}

function findBookInArray(books, idToFind) {
  const returnedBook = books.find((book) => { return book.id == idToFind; });
  return returnedBook;
}

function checkForAllBooks(poet, allBooksAllPoets) {
  const grabbedBookIds = poet.books.map((book) => {
    return findBookInArray(allBooksAllPoets.books.data, book);
  });
  return grabbedBookIds;
}

function sortBooks(toSort) {
  const sorted = toSort.sort((a, b) => {
    return moment.utc(a.first_publish_year).diff(moment.utc(b.first_publish_year));
  });
  return sorted;
}

function formatTimelineIntoData2(allBooksAllPoets) {
  return new Promise((fulfill, reject) => {
    const myDataset = [];
    allBooksAllPoets.poets.data.forEach((poet, idx) => {
      myDataset.push(new Promise((fulfill2, reject2) => {
        const grabbedBookIds = checkForAllBooks(poet, allBooksAllPoets);
        const sorted = sortBooks(grabbedBookIds);
        let startIndex = 0;
        let endIndex = sorted.length - 1;

        while (sorted[startIndex].first_publish_year === 0 && startIndex !== sorted.length - 1) {
          if (sorted[startIndex].first_publish_year === 0) {
            startIndex += 1;
          }
        }
        while (sorted[endIndex].first_publish_year === 0 && endIndex !== 0) {
          if (sorted[endIndex].first_publish_year === 0) {
            endIndex -= 1;
          }
        }

        const firstBookYear = moment(sorted[startIndex].first_publish_year, 'YYYY');
        let endYear = 0;
        if (sorted[endIndex].first_publish_year - sorted[0].first_publish_year < 2) {
          endYear = sorted[endIndex].first_publish_year + 1;
        } else {
          endYear = sorted[endIndex].first_publish_year;
        }
        const lastBookYear = moment(endYear, 'YYYY');
        console.log('firstBookYear: ', sorted[0].first_publish_year);
        console.log('lastBookYear: ', endYear);
        console.log('idx:', idx);

        const theTitle = `<div class="customTooltip">${poet.name}</div>`;
        fulfill2({
          id: poet.id, title: theTitle, content: poet.name, className: 'sampleItem', group: 1, subgroup: idx, start: firstBookYear, end: lastBookYear,
        });
      }));
    });
    Promise.all(myDataset).then((finishedDataset) => {
      console.log('filtering out finished dataset now: ');
      const filteredDataset = [];
      const seenIDs = [];
      for (let i = 0; i < finishedDataset.length; i += 1) {
        if (finishedDataset[i] != undefined && finishedDataset[i].id !== 123 && seenIDs.indexOf(finishedDataset[i].id) === -1) {
          seenIDs.push(finishedDataset[i].id);
          filteredDataset.push(finishedDataset[i]);
        } else {
          console.log('removing duplicate: ', finishedDataset[i]);
        }
      }
      console.log('finished gathering all data');
      fulfill(filteredDataset);
    })
      .catch((err) => {
        console.log('error: ', err);
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


export { getAllBooksforPoetsWrapper2, formatTimelineIntoData2, sortBooks };
