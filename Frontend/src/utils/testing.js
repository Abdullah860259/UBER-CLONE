const data = [
  {
    name: "Islamorada",
    country: "United States",
    lat: 24.9236561,
    lng: -80.6291479,
  },
  {
    name: "Islamorsdfada",
    country: "United States",
    lat: 24.9236561,
    lng: -80.6291479,
  },
  {
    name: "Islampur",
    country: "India",
    lat: 26.2563651,
    lng: 88.1860517,
  },
  {
    name: "Islampur",
    country: "India",
    lat: 26.2387741,
    lng: 88.2461426,
  },
  {
    name: "اسلام آباد",
    country: "پاکستان",
    lat: 33.6938118,
    lng: 73.0651511,
  },
  {
    name: "وفاقی دارالحکومت اسلام آباد",
    country: "پاکستان",
    lat: 33.6443389,
    lng: 73.1995493,
  },
];

const uniqueData = data.filter((ele, idx, arr) => {
  return idx === arr.findIndex((x) => x.name === ele.name);
});
console.log(uniqueData);
