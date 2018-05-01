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
        });
      });
  });
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

function formatTimelineIntoData2(allBooksAllPoets) {
  return new Promise((fulfill, reject) => {
    const myDataset = [];
    allBooksAllPoets.poets.data.forEach((poet) => {
      myDataset.push(new Promise((fulfill2, reject2) => {
        const grabbedBookIds = checkForAllBooks(poet, allBooksAllPoets);
        const sorted = sortBooks(grabbedBookIds);
        const endIndex = sorted.length - 1;


        const firstBookYear = moment(sorted[0].first_publish_year, 'YYYY');
        let endYear = 0;
        if (sorted[endIndex].first_publish_year - sorted[0].first_publish_year < 2) {
          endYear = sorted[endIndex].first_publish_year + 1;
        } else {
          endYear = sorted[endIndex].first_publish_year;
        }
        const lastBookYear = moment(endYear, 'YYYY');
        console.log('firstBookYear: ', sorted[0].first_publish_year);
        console.log('lastBookYear: ', endYear);

        fulfill2({
          id: poet.id, content: poet.name, className: 'sampleItem', start: firstBookYear, end: lastBookYear,
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

function formatTimelineIntoData(allBooksAllPoets) {
  return new Promise((fulfill, reject) => {
    const myDataset = [];
    allBooksAllPoets.forEach((poetsBooks) => {
      myDataset.push(new Promise((fulfill2, reject2) => {
        const sorted = sortBooks(poetsBooks);
        const startIndex = 0;
        const endIndex = sorted.length - 1;
        const firstBook = findElement(sorted, 0).then((retrievedFirstBook) => {
          findElement(sorted, (sorted.length - 1)).then((retrievedLastBook) => {
            console.log('first book is: ', retrievedFirstBook);
            console.log('last book is: ', retrievedLastBook);


            const firstBookYear = moment(retrievedFirstBook.first_publish_year, 'YYYY');
            let endYear = 0;
            if (retrievedLastBook.first_publish_year - retrievedFirstBook.first_publish_year < 2) {
              endYear = retrievedLastBook.first_publish_year + 1;
            } else {
              endYear = retrievedLastBook.first_publish_year;
            }
            const lastBookYear = moment(endYear, 'YYYY');
            console.log('firstBookYear: ', retrievedFirstBook.first_publish_year);
            console.log('lastBookYear: ', retrievedLastBook.first_publish_year);


            fetchPoetByName(retrievedFirstBook.author).then((res, err) => {
              if (res !== undefined && res.data !== null) {
                fulfill2({
                  id: res.data.id, content: res.data.name, className: 'sampleItem', start: firstBookYear, end: lastBookYear,
                });
              } else {
                console.log('error in creating timeline data point: ', err);
                fulfill2({
                  id: 123, content: 'junk', className: 'sampleItem', start: 1, end: 2,
                });
                // reject(err);
              }
            });
          });
        }); // first fineElement
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

function sortBooks(toSort) {
  const sorted = toSort.sort((a, b) => {
    return moment.utc(a.first_publish_year).diff(moment.utc(b.first_publish_year));
  });
  return sorted;
}

// NOTE: currently sets an infinite loop rip -- maybe take out of iterative
// find and do it manually?
function findElement(toSearch, index) {
  return new Promise((fulfill, reject) => {
    let myIndex = index;
    let foundBook = { first_publish_year: 0 };
    while (foundBook.first_publish_year === 0 && myIndex !== toSearch.length) {
      foundBook = toSearch.find((e) => {
        return e.id === toSearch[myIndex].id;
      });
      console.log('foundBook looks like: ', foundBook);
      if (foundBook.first_publish_year !== 0) {
        console.log('fulfilling foundBook with: ', foundBook);
        fulfill(foundBook);
        break;
      } else if (myIndex === toSearch.length - 1) {
        console.log('guess Im rejecting now');
        reject();
        break;
      } else {
        myIndex += 1;
      }
    }
  //  reject();
  });
}


export { getAllBooksforPoetsWrapper2, formatTimelineIntoData2, sortBooks, findElement };
