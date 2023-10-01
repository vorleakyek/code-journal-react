/* exported data */

export let data = {
  entries: [{
    entryId: 1,
    imgUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQJPaUIMOhLmrwRizWuRLf5aVc34bkX1YrYsGPj8hPaxiUSlyAY47tz0i9g6hZh3bfTUc2xUfUFLBsUXiPfPVYScs-Apy6RFQ5rYD_bLb5rGafL-A16Ht200g&usqp=CAc",
    notes: "Kiwi berries are edible fruits the size of a large grape, similar to fuzzy kiwifruit in taste and internal appearance but with a thin, smooth green skin.",
    title: "kiwi"
  },
  {
    entryId: 2,
    imgUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQJPaUIMOhLmrwRizWuRLf5aVc34bkX1YrYsGPj8hPaxiUSlyAY47tz0i9g6hZh3bfTUc2xUfUFLBsUXiPfPVYScs-Apy6RFQ5rYD_bLb5rGafL-A16Ht200g&usqp=CAc",
    notes: "Kiwi berries are edible fruits the size of a large grape, similar to fuzzy kiwifruit in taste and internal appearance but with a thin, smooth green skin.",
    title: "kiwi"
  },
  {
    entryId: 3,
    imgUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQJPaUIMOhLmrwRizWuRLf5aVc34bkX1YrYsGPj8hPaxiUSlyAY47tz0i9g6hZh3bfTUc2xUfUFLBsUXiPfPVYScs-Apy6RFQ5rYD_bLb5rGafL-A16Ht200g&usqp=CAc",
    notes: "Kiwi berries are edible fruits the size of a large grape, similar to fuzzy kiwifruit in taste and internal appearance but with a thin, smooth green skin.",
    title: "kiwi"
  }],
  nextEntryId: 1,
};

window.addEventListener('beforeunload', function () {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('code-journal-data', dataJSON);
});

const localData = JSON.parse(localStorage.getItem('code-journal-data'));
if (localData) {
  data = localData;
}
