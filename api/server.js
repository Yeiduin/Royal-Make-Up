const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const fs = require('fs')

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/reset', (req, res) => {
    let dbBackup = {
        "dogs": [
            {
                "id": 1,
                "name": "affenpinscher",
                "image": "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
                "weight": "3 - 6",
                "middle": 4.5,
                "property": "toy"
            },
            {
                "id": 2,
                "name": "afghan hound",
                "image": "https://cdn2.thedogapi.com/images/hMyT4CDXR.jpg",
                "weight": "23 - 27",
                "middle": 25,
                "property": "hound"
            },
            {
                "id": 3,
                "name": "african hunting dog",
                "image": "https://cdn2.thedogapi.com/images/rkiByec47.jpg",
                "weight": "20 - 30",
                "middle": 25
            },
            {
                "id": 4,
                "name": "airedale terrier",
                "image": "https://cdn2.thedogapi.com/images/1-7cgoZSh.jpg",
                "weight": "18 - 29",
                "middle": 23.5,
                "property": "terrier"
            },
            {
                "id": 5,
                "name": "akbash dog",
                "image": "https://cdn2.thedogapi.com/images/26pHT3Qk7.jpg",
                "weight": "41 - 54",
                "middle": 47.5,
                "property": "working"
            },
            {
                "id": 6,
                "name": "akita",
                "image": "https://cdn2.thedogapi.com/images/BFRYBufpm.jpg",
                "weight": "29 - 52",
                "middle": 40.5,
                "property": "working"
            },
            {
                "id": 7,
                "name": "alapaha blue blood bulldog",
                "image": "https://cdn2.thedogapi.com/images/33mJ-V3RX.jpg",
                "weight": "25 - 41",
                "middle": 33,
                "property": "mixed"
            },
            {
                "id": 8,
                "name": "alaskan husky",
                "image": "https://cdn2.thedogapi.com/images/-HgpNnGXl.jpg",
                "weight": "17 - 23",
                "middle": 20,
                "property": "mixed"
            },
            {
                "id": 9,
                "name": "alaskan malamute",
                "image": "https://cdn2.thedogapi.com/images/dW5UucTIW.jpg",
                "weight": "29 - 45",
                "middle": 37,
                "property": "working"
            },
            {
                "id": 10,
                "name": "american bulldog",
                "image": "https://cdn2.thedogapi.com/images/pk1AAdloG.jpg",
                "weight": "27 - 54",
                "middle": 40.5,
                "property": "working"
            },
            {
                "id": 11,
                "name": "american bully",
                "image": "https://cdn2.thedogapi.com/images/sqQJDtbpY.jpg",
                "weight": "14 - 68",
                "middle": 41,
                "property": ""
            },
            {
                "id": 12,
                "name": "american eskimo dog",
                "image": "https://cdn2.thedogapi.com/images/Bymjyec4m.jpg",
                "weight": "9 - 18",
                "middle": 13.5,
                "property": "non-sporting"
            },
            {
                "id": 13,
                "name": "american eskimo dog (miniature)",
                "image": "https://cdn2.thedogapi.com/images/_gn8GLrE6.jpg",
                "weight": "3 - 5",
                "middle": 4
            },
            {
                "id": 14,
                "name": "american foxhound",
                "image": "https://cdn2.thedogapi.com/images/S14n1x9NQ.jpg",
                "weight": "29 - 34",
                "middle": 31.5,
                "property": "hound"
            },
            {
                "id": 15,
                "name": "american pit bull terrier",
                "image": "https://cdn2.thedogapi.com/images/HkC31gcNm.png",
                "weight": "14 - 27",
                "middle": 20.5,
                "property": "terrier"
            },
            {
                "id": 16,
                "name": "american staffordshire terrier",
                "image": "https://cdn2.thedogapi.com/images/rJIakgc4m.jpg",
                "weight": "23 - 27",
                "middle": 25,
                "property": "terrier"
            },
            {
                "id": 17,
                "name": "american water spaniel",
                "image": "https://cdn2.thedogapi.com/images/SkmRJl9VQ.jpg",
                "weight": "11 - 20",
                "middle": 15.5,
                "property": "sporting"
            },
            {
                "id": 18,
                "name": "anatolian shepherd dog",
                "image": "https://cdn2.thedogapi.com/images/BJT0Jx5Nm.jpg",
                "weight": "36 - 68",
                "middle": 52,
                "property": "working"
            },
            {
                "id": 19,
                "name": "appenzeller sennenhund",
                "image": "https://cdn2.thedogapi.com/images/HkNkxlqEX.jpg",
                "weight": "22 - 25",
                "middle": 23.5
            },
            {
                "id": 21,
                "name": "australian cattle dog",
                "image": "https://cdn2.thedogapi.com/images/IBkYVm4v1.jpg",
                "weight": "20 - 28",
                "middle": 24,
                "property": "herding"
            },
            {
                "id": 22,
                "name": "australian kelpie",
                "image": "https://cdn2.thedogapi.com/images/Hyq1ge9VQ.jpg",
                "weight": "14 - 21",
                "middle": 17.5,
                "property": "herding"
            },
            {
                "id": 23,
                "name": "australian shepherd",
                "image": "https://cdn2.thedogapi.com/images/B1-llgq4m.jpg",
                "weight": "16 - 29",
                "middle": 22.5,
                "property": "herding"
            },
            {
                "id": 24,
                "name": "australian terrier",
                "image": "https://cdn2.thedogapi.com/images/r1Ylge5Vm.jpg",
                "weight": "6 - 7",
                "middle": 6.5,
                "property": "terrier"
            },
            {
                "id": 25,
                "name": "azawakh",
                "image": "https://cdn2.thedogapi.com/images/SkvZgx94m.jpg",
                "weight": "15 - 25",
                "middle": 20,
                "property": "hound"
            },
            {
                "id": 26,
                "name": "barbet",
                "image": "https://cdn2.thedogapi.com/images/HyWGexcVQ.jpg",
                "weight": "18 - 29",
                "middle": 23.5
            },
            {
                "id": 28,
                "name": "basenji",
                "image": "https://cdn2.thedogapi.com/images/H1dGlxqNQ.jpg",
                "weight": "10 - 11",
                "middle": 10.5,
                "property": "hound"
            },
            {
                "id": 29,
                "name": "basset bleu de gascogne",
                "image": "https://cdn2.thedogapi.com/images/BkMQll94X.jpg",
                "weight": "16 - 18",
                "middle": 17,
                "property": "hound"
            },
            {
                "id": 30,
                "name": "basset hound",
                "image": "https://cdn2.thedogapi.com/images/Sy57xx9EX.jpg",
                "weight": "23 - 29",
                "middle": 26,
                "property": "hound"
            },
            {
                "id": 31,
                "name": "beagle",
                "image": "https://cdn2.thedogapi.com/images/Syd4xxqEm.jpg",
                "weight": "9 - 16",
                "middle": 12.5,
                "property": "hound"
            },
            {
                "id": 32,
                "name": "bearded collie",
                "image": "https://cdn2.thedogapi.com/images/A09F4c1qP.jpg",
                "weight": "20 - 25",
                "middle": 22.5,
                "property": "herding"
            },
            {
                "id": 33,
                "name": "beauceron",
                "image": "https://cdn2.thedogapi.com/images/HJQ8ge5V7.jpg",
                "weight": "36 - 50",
                "middle": 43,
                "property": "herding"
            },
            {
                "id": 34,
                "name": "bedlington terrier",
                "image": "https://cdn2.thedogapi.com/images/ByK8gx947.jpg",
                "weight": "8 - 10",
                "middle": 9,
                "property": "terrier"
            },
            {
                "id": 36,
                "name": "belgian malinois",
                "image": "https://cdn2.thedogapi.com/images/r1f_ll5VX.jpg",
                "weight": "18 - 36",
                "middle": 27,
                "property": "herding"
            },
            {
                "id": 38,
                "name": "belgian tervuren",
                "image": "https://cdn2.thedogapi.com/images/B1KdxlcNX.jpg",
                "weight": "18 - 29",
                "middle": 23.5,
                "property": "herding"
            },
            {
                "id": 41,
                "name": "bernese mountain dog",
                "image": "https://cdn2.thedogapi.com/images/S1fFlx5Em.jpg",
                "weight": "29 - 54",
                "middle": 41.5,
                "property": "working"
            },
            {
                "id": 42,
                "name": "bichon frise",
                "image": "https://cdn2.thedogapi.com/images/HkuYlxqEQ.jpg",
                "weight": "5 - 8",
                "middle": 6.5,
                "property": "non-sporting"
            },
            {
                "id": 43,
                "name": "black and tan coonhound",
                "image": "https://cdn2.thedogapi.com/images/HJAFgxcNQ.jpg",
                "weight": "29 - 45",
                "middle": 37,
                "property": "hound"
            },
            {
                "id": 45,
                "name": "bloodhound",
                "image": "https://cdn2.thedogapi.com/images/Skdcgx9VX.jpg",
                "weight": "36 - 50",
                "middle": 43,
                "property": "hound"
            },
            {
                "id": 47,
                "name": "bluetick coonhound",
                "image": "https://cdn2.thedogapi.com/images/rJxieg9VQ.jpg",
                "weight": "20 - 36",
                "middle": 28,
                "property": "hound"
            },
            {
                "id": 48,
                "name": "boerboel",
                "image": "https://cdn2.thedogapi.com/images/HyOjge5Vm.jpg",
                "weight": "50 - 91",
                "middle": 70.5,
                "property": "working"
            },
            {
                "id": 50,
                "name": "border collie",
                "image": "https://cdn2.thedogapi.com/images/sGQvQUpsp.jpg",
                "weight": "14 - 20",
                "middle": 17,
                "property": "herding"
            },
            {
                "id": 51,
                "name": "border terrier",
                "image": "https://cdn2.thedogapi.com/images/HJOpge9Em.jpg",
                "weight": "5 - 7",
                "middle": 6,
                "property": "terrier"
            },
            {
                "id": 53,
                "name": "boston terrier",
                "image": "https://cdn2.thedogapi.com/images/rkZRggqVX.jpg",
                "weight": "5 - 11",
                "middle": 8,
                "property": "non-sporting"
            },
            {
                "id": 54,
                "name": "bouvier des flandres",
                "image": "https://cdn2.thedogapi.com/images/Byd0xl5VX.jpg",
                "weight": "32 - 50",
                "middle": 41,
                "property": "herding"
            },
            {
                "id": 55,
                "name": "boxer",
                "image": "https://cdn2.thedogapi.com/images/ry1kWe5VQ.jpg",
                "weight": "23 - 32",
                "middle": 27.5,
                "property": "working"
            },
            {
                "id": 56,
                "name": "boykin spaniel",
                "image": "https://cdn2.thedogapi.com/images/ryHJZlcNX.jpg",
                "weight": "11 - 18",
                "middle": 14.5,
                "property": "sporting"
            },
            {
                "id": 57,
                "name": "bracco italiano",
                "image": "https://cdn2.thedogapi.com/images/S13yZg5VQ.jpg",
                "weight": "25 - 40",
                "middle": 32.5,
                "property": "sporting"
            },
            {
                "id": 58,
                "name": "briard",
                "image": "https://cdn2.thedogapi.com/images/rkVlblcEQ.jpg",
                "weight": "32 - 41",
                "middle": 36.5,
                "property": "herding"
            },
            {
                "id": 59,
                "name": "brittany",
                "image": "https://cdn2.thedogapi.com/images/HJWZZxc4X.jpg",
                "weight": "14 - 20",
                "middle": 17,
                "property": "sporting"
            },
            {
                "id": 61,
                "name": "bull terrier",
                "image": "https://cdn2.thedogapi.com/images/VSraIEQGd.jpg",
                "weight": "23 - 32",
                "middle": 27.5,
                "property": "terrier"
            },
            {
                "id": 62,
                "name": "bull terrier (miniature)",
                "image": "https://cdn2.thedogapi.com/images/BkKZWlcVX.jpg",
                "weight": "11 - 15",
                "middle": 13
            },
            {
                "id": 64,
                "name": "bullmastiff",
                "image": "https://cdn2.thedogapi.com/images/r1ifZl5E7.jpg",
                "weight": "45 - 59",
                "middle": 52,
                "property": "working"
            },
            {
                "id": 65,
                "name": "cairn terrier",
                "image": "https://cdn2.thedogapi.com/images/Sk7Qbg9E7.jpg",
                "weight": "6 - 6",
                "middle": 6,
                "property": "terrier"
            },
            {
                "id": 67,
                "name": "cane corso",
                "image": "https://cdn2.thedogapi.com/images/r15m-lc4m.jpg",
                "weight": "40 - 54",
                "middle": 47,
                "property": "working"
            },
            {
                "id": 68,
                "name": "cardigan welsh corgi",
                "image": "https://cdn2.thedogapi.com/images/SyXN-e9NX.jpg",
                "weight": "11 - 17",
                "middle": 14,
                "property": "herding"
            },
            {
                "id": 69,
                "name": "catahoula leopard dog",
                "image": "https://cdn2.thedogapi.com/images/BJcNbec4X.jpg",
                "weight": "23 - 43",
                "middle": 33,
                "property": "herding"
            },
            {
                "id": 70,
                "name": "caucasian shepherd (ovcharka)",
                "image": "https://cdn2.thedogapi.com/images/r1rrWe5Em.jpg",
                "weight": "36 - 45",
                "middle": 40.5,
                "property": "working"
            },
            {
                "id": 71,
                "name": "cavalier king charles spaniel",
                "image": "https://cdn2.thedogapi.com/images/HJRBbe94Q.jpg",
                "weight": "6 - 8",
                "middle": 7,
                "property": "toy"
            },
            {
                "id": 76,
                "name": "chesapeake bay retriever",
                "image": "https://cdn2.thedogapi.com/images/9BXwUeCc2.jpg",
                "weight": "25 - 36",
                "middle": 30.5,
                "property": "sporting"
            },
            {
                "id": 78,
                "name": "chinese crested",
                "image": "https://cdn2.thedogapi.com/images/B1pDZx9Nm.jpg",
                "weight": "5 - 6",
                "middle": 5.5,
                "property": "toy"
            },
            {
                "id": 79,
                "name": "chinese shar-pei",
                "image": "https://cdn2.thedogapi.com/images/B1ruWl94Q.jpg",
                "weight": "20 - 27",
                "middle": 23.5,
                "property": "non-sporting"
            },
            {
                "id": 80,
                "name": "chinook",
                "image": "https://cdn2.thedogapi.com/images/Sypubg54Q.jpg",
                "weight": "23 - 41",
                "middle": 32,
                "property": "working"
            },
            {
                "id": 81,
                "name": "chow chow",
                "image": "https://cdn2.thedogapi.com/images/ry8KWgqEQ.jpg",
                "weight": "18 - 32",
                "middle": 25,
                "property": "non-sporting"
            },
            {
                "id": 84,
                "name": "clumber spaniel",
                "image": "https://cdn2.thedogapi.com/images/rkeqWgq4Q.jpg",
                "weight": "25 - 39",
                "middle": 32,
                "property": "sporting"
            },
            {
                "id": 86,
                "name": "cocker spaniel",
                "image": "https://cdn2.thedogapi.com/images/1lFmrzECl.jpg",
                "weight": "9 - 14",
                "middle": 11.5,
                "property": "sporting"
            },
            {
                "id": 87,
                "name": "cocker spaniel (american)",
                "image": "https://cdn2.thedogapi.com/images/HkRcZe547.jpg",
                "weight": "9 - 14",
                "middle": 11.5,
                "property": "sporting"
            },
            {
                "id": 89,
                "name": "coton de tulear",
                "image": "https://cdn2.thedogapi.com/images/SyviZlqNm.jpg",
                "weight": "4 - 7",
                "middle": 5.5,
                "property": "non-sporting"
            },
            {
                "id": 92,
                "name": "dalmatian",
                "image": "https://cdn2.thedogapi.com/images/SkJ3blcN7.jpg",
                "weight": "23 - 25",
                "middle": 24,
                "property": "non-sporting"
            },
            {
                "id": 94,
                "name": "doberman pinscher",
                "image": "https://cdn2.thedogapi.com/images/HyL3bl94Q.jpg",
                "weight": "30 - 40",
                "middle": 35,
                "property": "working"
            },
            {
                "id": 95,
                "name": "dogo argentino",
                "image": "https://cdn2.thedogapi.com/images/S1nhWx94Q.jpg",
                "weight": "36 - 45",
                "middle": 40.5,
                "property": "working"
            },
            {
                "id": 98,
                "name": "dutch shepherd",
                "image": "https://cdn2.thedogapi.com/images/BkE6Wg5E7.jpg",
                "weight": "23 - 32",
                "middle": 27.5
            },
            {
                "id": 101,
                "name": "english setter",
                "image": "https://cdn2.thedogapi.com/images/By4A-eqVX.jpg",
                "weight": "20 - 36",
                "middle": 28,
                "property": "sporting"
            },
            {
                "id": 102,
                "name": "english shepherd",
                "image": "https://cdn2.thedogapi.com/images/H1QyMe5EQ.jpg",
                "weight": "20 - 30",
                "middle": 25,
                "property": "working"
            },
            {
                "id": 103,
                "name": "english springer spaniel",
                "image": "https://cdn2.thedogapi.com/images/Hk0Jfe5VQ.jpg",
                "weight": "16 - 23",
                "middle": 19.5,
                "property": "sporting"
            },
            {
                "id": 104,
                "name": "english toy spaniel",
                "image": "https://cdn2.thedogapi.com/images/SkIgzxqNQ.jpg",
                "weight": "4 - 6",
                "middle": 5,
                "property": "toy"
            },
            {
                "id": 105,
                "name": "english toy terrier",
                "image": "https://cdn2.thedogapi.com/images/SJ6eMxqEQ.jpg",
                "weight": "3 - 4",
                "middle": 3.5
            },
            {
                "id": 107,
                "name": "eurasier",
                "image": "https://cdn2.thedogapi.com/images/S1VWGx9Nm.jpg",
                "weight": "18 - 32",
                "middle": 25,
                "property": "non-sporting"
            },
            {
                "id": 108,
                "name": "field spaniel",
                "image": "https://cdn2.thedogapi.com/images/SkJfGecE7.jpg",
                "weight": "16 - 23",
                "middle": 19.5,
                "property": "sporting"
            },
            {
                "id": 110,
                "name": "finnish lapphund",
                "image": "https://cdn2.thedogapi.com/images/S1KMGg5Vm.jpg",
                "weight": "15 - 24",
                "middle": 19.5,
                "property": "herding"
            },
            {
                "id": 111,
                "name": "finnish spitz",
                "image": "https://cdn2.thedogapi.com/images/3PjHlQbkV.jpg",
                "weight": "10 - 13",
                "middle": 11.5,
                "property": "non-sporting"
            },
            {
                "id": 113,
                "name": "french bulldog",
                "image": "https://cdn2.thedogapi.com/images/HyWNfxc47.jpg",
                "weight": "?? - ??",
                "middle": 99,
                "property": "non-sporting"
            },
            {
                "id": 114,
                "name": "german pinscher",
                "image": "https://cdn2.thedogapi.com/images/B1u4zgqE7.jpg",
                "weight": "11 - 20",
                "middle": 15.5,
                "property": "working"
            },
            {
                "id": 115,
                "name": "german shepherd dog",
                "image": "https://cdn2.thedogapi.com/images/SJyBfg5NX.jpg",
                "weight": "23 - 41",
                "middle": 32,
                "property": "herding"
            },
            {
                "id": 116,
                "name": "german shorthaired pointer",
                "image": "https://cdn2.thedogapi.com/images/SJqBMg5Nm.jpg",
                "weight": "20 - 32",
                "middle": 26,
                "property": "sporting"
            },
            {
                "id": 119,
                "name": "giant schnauzer",
                "image": "https://cdn2.thedogapi.com/images/H1NIzlcV7.jpg",
                "weight": "29 - 41",
                "middle": 35,
                "property": "working"
            },
            {
                "id": 120,
                "name": "glen of imaal terrier",
                "image": "https://cdn2.thedogapi.com/images/H1oLMe94m.jpg",
                "weight": "15 - 18",
                "middle": 16.5,
                "property": "terrier"
            },
            {
                "id": 121,
                "name": "golden retriever",
                "image": "https://cdn2.thedogapi.com/images/HJ7Pzg5EQ.jpg",
                "weight": "25 - 34",
                "middle": 29.5,
                "property": "sporting"
            },
            {
                "id": 123,
                "name": "gordon setter",
                "image": "https://cdn2.thedogapi.com/images/SJ5vzx5NX.jpg",
                "weight": "20 - 36",
                "middle": 28,
                "property": "sporting"
            },
            {
                "id": 124,
                "name": "great dane",
                "image": "https://cdn2.thedogapi.com/images/B1Edfl9NX.jpg",
                "weight": "50 - 86",
                "middle": 68,
                "property": "working"
            },
            {
                "id": 125,
                "name": "great pyrenees",
                "image": "https://cdn2.thedogapi.com/images/B12uzg9V7.png",
                "weight": "39 - 52",
                "middle": 45.5,
                "property": "working"
            },
            {
                "id": 127,
                "name": "greyhound",
                "image": "https://cdn2.thedogapi.com/images/ryNYMx94X.jpg",
                "weight": "23 - 32",
                "middle": 27.5,
                "property": "hound"
            },
            {
                "id": 128,
                "name": "griffon bruxellois",
                "image": "https://cdn2.thedogapi.com/images/ryoYGec4Q.jpg",
                "weight": "?? - ??",
                "middle": 99
            },
            {
                "id": 129,
                "name": "harrier",
                "image": "https://cdn2.thedogapi.com/images/B1IcfgqE7.jpg",
                "weight": "18 - 27",
                "middle": 22.5,
                "property": "hound"
            },
            {
                "id": 130,
                "name": "havanese",
                "image": "https://cdn2.thedogapi.com/images/rkXiGl9V7.jpg",
                "weight": "3 - 6",
                "middle": 4.5,
                "property": "toy"
            },
            {
                "id": 134,
                "name": "irish setter",
                "image": "https://cdn2.thedogapi.com/images/S1osGeqVm.jpg",
                "weight": "16 - 32",
                "middle": 24,
                "property": "sporting"
            },
            {
                "id": 135,
                "name": "irish terrier",
                "image": "https://cdn2.thedogapi.com/images/By-hGecVX.jpg",
                "weight": "11 - 12",
                "middle": 11.5,
                "property": "terrier"
            },
            {
                "id": 137,
                "name": "irish wolfhound",
                "image": "https://cdn2.thedogapi.com/images/Hyd2zgcEX.jpg",
                "weight": "48 - 82",
                "middle": 65,
                "property": "hound"
            },
            {
                "id": 138,
                "name": "italian greyhound",
                "image": "https://cdn2.thedogapi.com/images/SJAnzg9NX.jpg",
                "weight": "3 - 7",
                "middle": 5,
                "property": "toy"
            },
            {
                "id": 140,
                "name": "japanese chin",
                "image": "https://cdn2.thedogapi.com/images/r1H6feqEm.jpg",
                "weight": "2 - 4",
                "middle": 3,
                "property": "toy"
            },
            {
                "id": 141,
                "name": "japanese spitz",
                "image": "https://cdn2.thedogapi.com/images/HksaMxqNX.jpg",
                "weight": "7 - 9",
                "middle": 8
            },
            {
                "id": 142,
                "name": "keeshond",
                "image": "https://cdn2.thedogapi.com/images/S1GAGg9Vm.jpg",
                "weight": "16 - 20",
                "middle": 18,
                "property": "non-sporting"
            },
            {
                "id": 144,
                "name": "komondor",
                "image": "https://cdn2.thedogapi.com/images/Bko0fl547.jpg",
                "weight": "36 - 45",
                "middle": 40.5,
                "property": "working"
            },
            {
                "id": 145,
                "name": "kooikerhondje",
                "image": "https://cdn2.thedogapi.com/images/kOMy84GQE.jpg",
                "weight": "9 - 14",
                "middle": 11.5,
                "property": "sporting"
            },
            {
                "id": 147,
                "name": "kuvasz",
                "image": "https://cdn2.thedogapi.com/images/BykZ7ecVX.jpg",
                "weight": "32 - 52",
                "middle": 42,
                "property": "working"
            },
            {
                "id": 149,
                "name": "labrador retriever",
                "image": "https://cdn2.thedogapi.com/images/B1uW7l5VX.jpg",
                "weight": "25 - 36",
                "middle": 30.5,
                "property": "sporting"
            },
            {
                "id": 151,
                "name": "lagotto romagnolo",
                "image": "https://cdn2.thedogapi.com/images/ryzzmgqE7.jpg",
                "weight": "11 - 16",
                "middle": 13.5,
                "property": "sporting"
            },
            {
                "id": 153,
                "name": "lancashire heeler",
                "image": "https://cdn2.thedogapi.com/images/S1RGml5Em.jpg",
                "weight": "3 - 6",
                "middle": 4.5
            },
            {
                "id": 155,
                "name": "leonberger",
                "image": "https://cdn2.thedogapi.com/images/ByrmQlqVm.jpg",
                "weight": "54 - 77",
                "middle": 65.5,
                "property": "working"
            },
            {
                "id": 156,
                "name": "lhasa apso",
                "image": "https://cdn2.thedogapi.com/images/SJp7Qe5EX.jpg",
                "weight": "5 - 8",
                "middle": 6.5,
                "property": "non-sporting"
            },
            {
                "id": 161,
                "name": "maltese",
                "image": "https://cdn2.thedogapi.com/images/B1SV7gqN7.jpg",
                "weight": "2 - 3",
                "middle": 2.5,
                "property": "toy"
            },
            {
                "id": 165,
                "name": "miniature american shepherd",
                "image": "https://cdn2.thedogapi.com/images/BkHHQgcN7.jpg",
                "weight": "9 - 18",
                "middle": 13.5,
                "property": "herding"
            },
            {
                "id": 167,
                "name": "miniature pinscher",
                "image": "https://cdn2.thedogapi.com/images/Hy3H7g94X.jpg",
                "weight": "4 - 5",
                "middle": 4.5,
                "property": "toy"
            },
            {
                "id": 168,
                "name": "miniature schnauzer",
                "image": "https://cdn2.thedogapi.com/images/SJIUQl9NX.jpg",
                "weight": "5 - 9",
                "middle": 7,
                "property": "terrier"
            },
            {
                "id": 171,
                "name": "newfoundland",
                "image": "https://cdn2.thedogapi.com/images/Sk4DXl54m.jpg",
                "weight": "45 - 68",
                "middle": 56.5,
                "property": "working"
            },
            {
                "id": 172,
                "name": "norfolk terrier",
                "image": "https://cdn2.thedogapi.com/images/B1ADQg94X.jpg",
                "weight": "5 - 5",
                "middle": 5,
                "property": "terrier"
            },
            {
                "id": 176,
                "name": "norwich terrier",
                "image": "https://cdn2.thedogapi.com/images/BkgKXlqE7.jpg",
                "weight": "5 - 5",
                "middle": 5,
                "property": "terrier"
            },
            {
                "id": 177,
                "name": "nova scotia duck tolling retriever",
                "image": "https://cdn2.thedogapi.com/images/SyYtQe5V7.jpg",
                "weight": "16 - 23",
                "middle": 19.5,
                "property": "sporting"
            },
            {
                "id": 178,
                "name": "old english sheepdog",
                "image": "https://cdn2.thedogapi.com/images/HkZ57lq4m.jpg",
                "weight": "27 - 45",
                "middle": 36,
                "property": "herding"
            },
            {
                "id": 179,
                "name": "olde english bulldogge",
                "image": "https://cdn2.thedogapi.com/images/B1d5me547.jpg",
                "weight": "?? - ??",
                "middle": 99
            },
            {
                "id": 181,
                "name": "papillon",
                "image": "https://cdn2.thedogapi.com/images/SkJj7e547.jpg",
                "weight": "1 - 5",
                "middle": 3,
                "property": "toy"
            },
            {
                "id": 183,
                "name": "pekingese",
                "image": "https://cdn2.thedogapi.com/images/ByIiml9Nm.jpg",
                "weight": "?? - ??",
                "middle": 99,
                "property": "toy"
            },
            {
                "id": 184,
                "name": "pembroke welsh corgi",
                "image": "https://cdn2.thedogapi.com/images/rJ6iQeqEm.jpg",
                "weight": "11 - 14",
                "middle": 12.5,
                "property": "herding"
            },
            {
                "id": 185,
                "name": "perro de presa canario",
                "image": "https://cdn2.thedogapi.com/images/S1V3Qeq4X.jpg",
                "weight": "40 - 50",
                "middle": 45,
                "property": "working"
            },
            {
                "id": 188,
                "name": "pharaoh hound",
                "image": "https://cdn2.thedogapi.com/images/Byz6mgqEQ.jpg",
                "weight": "18 - 27",
                "middle": 22.5,
                "property": "hound"
            },
            {
                "id": 189,
                "name": "plott",
                "image": "https://cdn2.thedogapi.com/images/B1i67l5VQ.jpg",
                "weight": "18 - 27",
                "middle": 22.5,
                "property": "hound"
            },
            {
                "id": 193,
                "name": "pomeranian",
                "image": "https://cdn2.thedogapi.com/images/HJd0XecNX.jpg",
                "weight": "1 - 3",
                "middle": 2,
                "property": "toy"
            },
            {
                "id": 196,
                "name": "poodle (miniature)",
                "image": "https://cdn2.thedogapi.com/images/Hkxk4ecVX.jpg",
                "weight": "7 - 8",
                "middle": 7.5
            },
            {
                "id": 197,
                "name": "poodle (toy)",
                "image": "https://cdn2.thedogapi.com/images/rJFJVxc4m.jpg",
                "weight": "3 - 4",
                "middle": 3.5
            },
            {
                "id": 201,
                "name": "pug",
                "image": "https://cdn2.thedogapi.com/images/HyJvcl9N7.jpg",
                "weight": "6 - 8",
                "middle": 7,
                "property": "toy"
            },
            {
                "id": 204,
                "name": "puli",
                "image": "https://cdn2.thedogapi.com/images/ryPgVl5N7.jpg",
                "weight": "11 - 16",
                "middle": 13.5,
                "property": "herding"
            },
            {
                "id": 205,
                "name": "pumi",
                "image": "https://cdn2.thedogapi.com/images/SyRe4xcN7.jpg",
                "weight": "8 - 15",
                "middle": 11.5,
                "property": "herding"
            },
            {
                "id": 207,
                "name": "rat terrier",
                "image": "https://cdn2.thedogapi.com/images/HkXWNl9E7.jpg",
                "weight": "4 - 11",
                "middle": 7.5,
                "property": "terrier"
            },
            {
                "id": 208,
                "name": "redbone coonhound",
                "image": "https://cdn2.thedogapi.com/images/HJMzEl5N7.jpg",
                "weight": "20 - 36",
                "middle": 28,
                "property": "hound"
            },
            {
                "id": 209,
                "name": "rhodesian ridgeback",
                "image": "https://cdn2.thedogapi.com/images/By9zNgqE7.jpg",
                "weight": "34 - 36",
                "middle": 35,
                "property": "hound"
            },
            {
                "id": 210,
                "name": "rottweiler",
                "image": "https://cdn2.thedogapi.com/images/r1xXEgcNX.jpg",
                "weight": "34 - 50",
                "middle": 42,
                "property": "working"
            },
            {
                "id": 211,
                "name": "russian toy",
                "image": "https://cdn2.thedogapi.com/images/HkP7Vxc4Q.jpg",
                "weight": "1 - 3",
                "middle": 2,
                "property": "toy"
            },
            {
                "id": 212,
                "name": "saint bernard",
                "image": "https://cdn2.thedogapi.com/images/_Qf9nfRzL.png",
                "weight": "59 - 82",
                "middle": 70.5,
                "property": "working"
            },
            {
                "id": 213,
                "name": "saluki",
                "image": "https://cdn2.thedogapi.com/images/fjFIuehNo.jpg",
                "weight": "16 - 29",
                "middle": 22.5,
                "property": "hound"
            },
            {
                "id": 214,
                "name": "samoyed",
                "image": "https://cdn2.thedogapi.com/images/S1T8Ee9Nm.jpg",
                "weight": "23 - 27",
                "middle": 25,
                "property": "working"
            },
            {
                "id": 216,
                "name": "schipperke",
                "image": "https://cdn2.thedogapi.com/images/SyBvVgc47.jpg",
                "weight": "5 - 7",
                "middle": 6,
                "property": "non-sporting"
            },
            {
                "id": 218,
                "name": "scottish deerhound",
                "image": "https://cdn2.thedogapi.com/images/SkNjqx9NQ.jpg",
                "weight": "32 - 59",
                "middle": 45.5,
                "property": "hound"
            },
            {
                "id": 219,
                "name": "scottish terrier",
                "image": "https://cdn2.thedogapi.com/images/Bklnce5NX.jpg",
                "weight": "8 - 10",
                "middle": 9,
                "property": "terrier"
            },
            {
                "id": 221,
                "name": "shetland sheepdog",
                "image": "https://cdn2.thedogapi.com/images/rJa29l9E7.jpg",
                "weight": "?? - ??",
                "middle": 99,
                "property": "herding"
            },
            {
                "id": 222,
                "name": "shiba inu",
                "image": "https://cdn2.thedogapi.com/images/Zn3IjPX3f.jpg",
                "weight": "8 - 10",
                "middle": 9,
                "property": "non-sporting"
            },
            {
                "id": 223,
                "name": "shih tzu",
                "image": "https://cdn2.thedogapi.com/images/BkrJjgcV7.jpg",
                "weight": "4 - 7",
                "middle": 5.5,
                "property": "toy"
            },
            {
                "id": 225,
                "name": "shiloh shepherd",
                "image": "https://cdn2.thedogapi.com/images/SJJxjecEX.jpg",
                "weight": "54 - 64",
                "middle": 59,
                "property": "toy"
            },
            {
                "id": 226,
                "name": "siberian husky",
                "image": "https://cdn2.thedogapi.com/images/S17ZilqNm.jpg",
                "weight": "16 - 27",
                "middle": 21.5,
                "property": "working"
            },
            {
                "id": 228,
                "name": "silky terrier",
                "image": "https://cdn2.thedogapi.com/images/ByzGsl5Nm.jpg",
                "weight": "4 - 5",
                "middle": 4.5,
                "property": "toy"
            },
            {
                "id": 232,
                "name": "smooth fox terrier",
                "image": "https://cdn2.thedogapi.com/images/Syszjx9Em.jpg",
                "weight": "?? - ??",
                "middle": 99,
                "property": "terrier"
            },
            {
                "id": 233,
                "name": "soft coated wheaten terrier",
                "image": "https://cdn2.thedogapi.com/images/HJHmix5NQ.jpg",
                "weight": "14 - 18",
                "middle": 16,
                "property": "terrier"
            },
            {
                "id": 235,
                "name": "spanish water dog",
                "image": "https://cdn2.thedogapi.com/images/HJf4jl9VX.jpg",
                "weight": "14 - 23",
                "middle": 18.5,
                "property": "sporting"
            },
            {
                "id": 236,
                "name": "spinone italiano",
                "image": "https://cdn2.thedogapi.com/images/rk5Eoe5Nm.jpg",
                "weight": "28 - 39",
                "middle": 33.5,
                "property": "sporting"
            },
            {
                "id": 238,
                "name": "staffordshire bull terrier",
                "image": "https://cdn2.thedogapi.com/images/H1zSie9V7.jpg",
                "weight": "11 - 17",
                "middle": 14,
                "property": "terrier"
            },
            {
                "id": 239,
                "name": "standard schnauzer",
                "image": "https://cdn2.thedogapi.com/images/tmzeu6ID_.jpg",
                "weight": "14 - 23",
                "middle": 18.5,
                "property": "working"
            },
            {
                "id": 242,
                "name": "swedish vallhund",
                "image": "https://cdn2.thedogapi.com/images/HJ-Dix94Q.jpg",
                "weight": "9 - 14",
                "middle": 11.5,
                "property": "herding"
            },
            {
                "id": 243,
                "name": "thai ridgeback",
                "image": "https://cdn2.thedogapi.com/images/zv89hR-O8.jpg",
                "weight": "16 - 25",
                "middle": 20.5,
                "property": "hound"
            },
            {
                "id": 244,
                "name": "tibetan mastiff",
                "image": "https://cdn2.thedogapi.com/images/SkM9sec47.jpg",
                "weight": "39 - 64",
                "middle": 51.5,
                "property": "working"
            },
            {
                "id": 245,
                "name": "tibetan spaniel",
                "image": "https://cdn2.thedogapi.com/images/Hyjcol947.jpg",
                "weight": "4 - 7",
                "middle": 5.5,
                "property": "non-sporting"
            },
            {
                "id": 246,
                "name": "tibetan terrier",
                "image": "https://cdn2.thedogapi.com/images/6f5n_42mB.jpg",
                "weight": "9 - 11",
                "middle": 10,
                "property": "non-sporting"
            },
            {
                "id": 248,
                "name": "toy fox terrier",
                "image": "https://cdn2.thedogapi.com/images/B17ase9V7.jpg",
                "weight": "2 - 4",
                "middle": 3,
                "property": "toy"
            },
            {
                "id": 250,
                "name": "treeing walker coonhound",
                "image": "https://cdn2.thedogapi.com/images/SkRpsgc47.jpg",
                "weight": "20 - 36",
                "middle": 28,
                "property": "hound"
            },
            {
                "id": 251,
                "name": "vizsla",
                "image": "https://cdn2.thedogapi.com/images/r1o0jx9Em.jpg",
                "weight": "23 - 29",
                "middle": 26,
                "property": "sporting"
            },
            {
                "id": 253,
                "name": "weimaraner",
                "image": "https://cdn2.thedogapi.com/images/SyU12l9V7.jpg",
                "weight": "25 - 41",
                "middle": 33,
                "property": "sporting"
            },
            {
                "id": 254,
                "name": "welsh springer spaniel",
                "image": "https://cdn2.thedogapi.com/images/BJ1gnx5Vm.jpg",
                "weight": "16 - 25",
                "middle": 20.5,
                "property": "sporting"
            },
            {
                "id": 256,
                "name": "west highland white terrier",
                "image": "https://cdn2.thedogapi.com/images/Bkdx2g5Em.jpg",
                "weight": "7 - 10",
                "middle": 8.5,
                "property": "terrier"
            },
            {
                "id": 257,
                "name": "whippet",
                "image": "https://cdn2.thedogapi.com/images/Hyv-ne94m.jpg",
                "weight": "11 - 16",
                "middle": 13.5,
                "property": "hound"
            },
            {
                "id": 258,
                "name": "white shepherd",
                "image": "https://cdn2.thedogapi.com/images/r14M3e9E7.jpg",
                "weight": "27 - 39",
                "middle": 33,
                "property": "hound"
            },
            {
                "id": 259,
                "name": "wire fox terrier",
                "image": "https://cdn2.thedogapi.com/images/SJ6f2g9EQ.jpg",
                "weight": "7 - 9",
                "middle": 8,
                "property": "hound"
            },
            {
                "id": 260,
                "name": "wirehaired pointing griffon",
                "image": "https://cdn2.thedogapi.com/images/Bkam2l9Vm.jpg",
                "weight": "20 - 32",
                "middle": 26,
                "property": "sporting"
            },
            {
                "id": 261,
                "name": "wirehaired vizsla",
                "image": "https://cdn2.thedogapi.com/images/r1I4hl5Em.jpg",
                "weight": "20 - 29",
                "middle": 24.5,
                "property": "sporting"
            },
            {
                "id": 262,
                "name": "xoloitzcuintli",
                "image": "https://cdn2.thedogapi.com/images/HkNS3gqEm.jpg",
                "weight": "4 - 14",
                "middle": 9,
                "property": "non-sporting"
            },
            {
                "id": 264,
                "name": "yorkshire terrier",
                "image": "https://cdn2.thedogapi.com/images/B12BnxcVQ.jpg",
                "weight": "2 - 3",
                "middle": 2.5,
                "property": "toy"
            }
        ],
        "test": [{ "id": 1, "name": "facu" }]
    };
    const pass = req.query.pass;

    if (pass === "xd") {
        dbBackup = JSON.stringify(dbBackup);
        fs.writeFileSync('db.json', dbBackup);
        res.status(200).json("BD reset...");
    } else {
        res.status(400).json("error in admin pass...");
    }
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server

// Use default router
server.use(router)
server.listen(3001, () => {
    console.log('JSON Server is running')
})