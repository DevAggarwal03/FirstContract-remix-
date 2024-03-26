// pragma solidity ^0.8.7;

// contract SimpleStorage{
//     uint256 favNum;

//     function addFavNum(uint256 _favNum) public {
//         favNum = _favNum;
//     }

//     function showFavNum() view public returns(uint256){
//         return favNum;
//     }
// }


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 favNum; // favNum = 0 (default)

    // People public person1 = People({favoriteNumber: 2, name: "Dev"});
    // People public person2 = People({favoriteNumber: 44, name: "rohit"});
    // People public person3 = People({favoriteNumber: 13, name: "shivani"});

    struct People {
        string name;
        uint256 favoriteNumber;
    }

    People[] public peoplesList;

    mapping(string => uint256) public strToNum;

    // People public newPeople = People({favoriteNumber: 23, name: "sharnam"});

    // peoplesList.push(newPeople);

    function store(uint256 _favNum) public virtual {
        favNum = _favNum;
    }

    //view -> used only to read, does not allow any modification to blockChain Data. no gas is used
    //pure -> cannot read, cannot modify. No gas is used

    //eg of view:
    function retrieve() public view returns (uint256) {
        return favNum;
    }// // SPDX-License-Identifier: MIT

    //eg of pure:
    // function greetings() public pure returns(string memory){
    //     return "hello there" ;
    // }

    //view and pure do not require gas when called by a user, but cost some gas fee when is called inside a simple funtion(not view or pure);

    function addPerson(string memory _name, uint256 _favNum) public virtual {
        peoplesList.push(People(_name, _favNum));
        strToNum[_name] = _favNum;
    }
}