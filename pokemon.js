
const inquirer = require('inquirer')
const firstQuestions = [
  {
    type: 'input',
    name: 'name',
    message: 'What is your name?',
    default: 'Ash',
  },
  {
    type: 'list',
    name: 'pokemonType',
    message: 'Choose your starting type?',
    choices: ['Fire', 'Grass', 'Water', 'Normal'],
  },
  {
    type: 'input',
    name: 'pokemon',
    message: 'Name your starting pokemon?',
  }
]
const secondQuestions = [
  {
    type: 'list',
    name: 'yourChoice',
    message: 'Choose:',
    choices: ['Catch Pokemon', 'Fight', 'Runaway'],
  },
];
const thirdQuestions = [
  {
    type: 'list',
    name: 'yourChoice',
    message: 'Catch a Pokemon',
    choices: ['Squirtle', 'Charmander', 'Bulbasaur', 'Rattata'],
  },
];

let trainer;
let firePokemon;
let pcTrainer;
let pcPokemon;
let newBattle;


function playGame() {

  inquirer
    .prompt(firstQuestions)
    .then(function (firstAnswers) {
      // do stuff with the answers to the firstQuestions, e.g. create trainers and catch pokemon
      console.log(firstAnswers);
      trainer = new Trainer(firstAnswers.name)

      function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
      }

      if (firstAnswers.pokemonType === 'Fire') {
        playersPokemon = new Fire(firstAnswers.pokemon, randomIntFromInterval(30, 100), randomIntFromInterval(5, 20), 'fireball')
      } else if (firstAnswers.pokemonType === 'Grass') {
        playersPokemon = new Grass(firstAnswers.pokemon, randomIntFromInterval(30, 100), randomIntFromInterval(5, 20), 'vinewhip')
      } else if (firstAnswers.pokemonType === 'Water') {
        playersPokemon = new Water(firstAnswers.pokemon, randomIntFromInterval(30, 100), randomIntFromInterval(5, 20), 'watergun')
      } else if (firstAnswers.pokemonType === 'Normal') {
        playersPokemon = new Normal(firstAnswers.pokemon, randomIntFromInterval(30, 100), randomIntFromInterval(5, 20), 'tackle')
      }
      
      trainer.catch(playersPokemon)
      pcTrainer = new Trainer('Brock')
      pcPokemon = new Rattata('Rattata', 55, 18, 'tackle')
      pcTrainer.catch(pcPokemon);
      newBattle = new Battle(playersPokemon, trainer, pcPokemon, pcTrainer)
      

      return menu()
    })
  };

  function menu() {
    inquirer.prompt(secondQuestions).then((answers) => {
    // do stuff with the answers to the secondQuestions, e.g. choose moves to use / fight / run away / select pokemon to fight with
    if (answers.yourChoice === 'Catch Pokemon') {
      catchPokemon()
    }
    
    if (answers.yourChoice === 'Fight') {
      console.log(newBattle.fight(playersPokemon.name))
      console.log(newBattle.fight(pcPokemon.name))
        if (playersPokemon.hitpoints <= 0 || pcPokemon.hitpoints <= 0) {
          console.log('Game Over!')
        } else { return menu() }

      } else if (answers.yourChoice === 'Runaway') {
        console.log(`${trainer.name} fled the scene...`)
      }
    })
  }

  function catchPokemon() {
    inquirer.prompt(thirdQuestions).then((answers) => {
      const charmander = new Charmander('Charmander', 44, 17,)
      const squirtle = new Squirtle('Squirtle', 44, 16)
      const bulbasaur = new Bulbasaur('Bulbasaur', 45, 16)
      const rattata = new Rattata('Rattata', 44, 18)
      const pokemonArr = [charmander, squirtle, bulbasaur, rattata];
      for (let i = 0; i < pokemonArr.length; i++) {
        if (answers.yourChoice === pokemonArr[i].name) {
          trainer.catch(pokemonArr[i])
        }
      }
      return menu()
    })
  }
  


playGame();


class Pokemon {
  constructor(name, hitpoints, attackDamage, move = 'tackle') {
    this.name = name;
    this.hitpoints = hitpoints;
    this.attackDamage = attackDamage;
    this.move = move;
  }

  takeDamage(num) {
    this.hitpoints -= num;
    return this.hitpoints 
  }
  
  useMove() {
    console.log(`${this.name} used ${this.move}`)
    return this.attackDamage
  }
  hasFainted() {
    return (this.hitpoints <= 0)
  }
}


class Fire extends Pokemon {
  constructor(name, hitpoints, attackDamage, move = 'Fireball') {
    super(name, hitpoints, attackDamage, move = 'Fireball')
    this.type = 'Fire'
  }
  isEffectiveAgainst(pokemon) {
    return (pokemon.type === 'Grass')
  }
  isWeakTo(pokemon) {
    return (pokemon.type === 'Water')
  }
}

class Water extends Pokemon {
  constructor(name, hitpoints, attackDamage, move = 'Watergun') {
    super(name, hitpoints, attackDamage, move = 'Watergun')
    this.type = 'Water'
  }
  isEffectiveAgainst(pokemon) {
    return (pokemon.type === 'Fire')
  }
  isWeakTo(pokemon) {
    return (pokemon.type === 'Grass')
  }
}

class Grass extends Pokemon {
  constructor(name, hitpoints, attackDamage, move = 'Vinewhip') {
    super(name, hitpoints, attackDamage, move = 'Vinewhip')
    this.type = 'Grass'
  }
  isEffectiveAgainst(pokemon) {
    return (pokemon.type === 'Water')
  }
  isWeakTo(pokemon) {
    return (pokemon.type === 'Fire')
  }
}

class Normal extends Pokemon {
  constructor(name, hitpoints, attackDamage, move = 'Tackle') {
    super(name, hitpoints, attackDamage, move = 'Tackle')
    this.type = 'Normal'
  }
  isEffectiveAgainst(pokemon) {
    return false
  }
  isWeakTo(pokemon) {
    return false
  }
}
class Charmander extends Fire {
  constructor(name, hitpoints, attackDamage, move) {
    super(name, hitpoints, attackDamage, move)
    this.move = 'Ember'
  }
}

class Squirtle extends Water {
  constructor(name, hitpoints, attackDamage, move) {
    super(name, hitpoints, attackDamage, move)
    this.move = 'Water Gun'
  }
}

class Bulbasaur extends Grass {
  constructor(name, hitpoints, attackDamage, move) {
    super(name, hitpoints, attackDamage, move)
    this.move = 'Vine Whip'
  }
}

class Rattata extends Normal {
  constructor(name, hitpoints, attackDamage, move = 'Tackle') {
    super(name, hitpoints, attackDamage, move = 'Tackle')

  }
}

class Pokeball {
  constructor(pokemon) {
    this.pokemon = pokemon
  }

  isEmpty() {
    return (!this.pokemon)
  }

  contains() {
    if (this.isEmpty()) return 'Empty'
    return this.pokemon.name
  }

  throw(pokemon) {
    if (!pokemon) {
      if (this.isEmpty()) {
        console.log('Pokeball Empty!')
      } else {
        console.log(`Go ${this.pokemon.name}!!`)
      }
    }
    
    if (this.isEmpty() && pokemon) {
      this.pokemon = pokemon
     // console.log(`You caught ${this.pokemon.name}`)
    } else if (!this.isEmpty() && pokemon) {
      console.log('Pokeball full')
    }
  }
}

class Trainer {
  constructor(name) {
    const pokeballOne = new Pokeball();
    const pokeballTwo = new Pokeball();
    const pokeballThree = new Pokeball();
    const pokeballFour = new Pokeball()
    const pokeballFive = new Pokeball()
    const pokeballSix = new Pokeball()

    this.name = name
    this.belt = [
    pokeballOne,
    pokeballTwo,
    pokeballThree,
    pokeballFour,
    pokeballFive,
    pokeballSix
    ];
    this.thrown = false
  }
  catch(pokemon) {
    for (let i = 0; i < this.belt.length; i++) {
      if (this.belt[i].isEmpty() === true) {
        this.belt[i].throw(pokemon)
        return true
      }
    }
    console.log('Pokebelt full!')
    return false
  }

  getPokemon(name) {
    
       for (let i = 0; i < this.belt.length; i++) {
      if (this.belt[i].contains() === name) {
        if (this.thrown === false){
        this.belt[i].throw(this.pokemon)
        this.thrown = true}
        return this.belt[i].pokemon
      }
    }
  }
}

class Battle {
  constructor(pokemonOne, trainerOne, pokemonTwo, trainerTwo) {
    this.pokemonOne = pokemonOne;
    this.trainerOne = trainerOne;
    this.trainerTwo = trainerTwo;
    this.pokemonTwo = pokemonTwo;
    this.turn = 0;
  }
  
  fight(name) {
    this.turn++
    let fightMessage = '';
    console.log(`Turn: ${this.turn}`)
    let attackingPokemon;
    let attackingPlayer;
    if (this.trainerOne.getPokemon(name)){
      attackingPlayer = this.trainerOne
      console.log(`${attackingPlayer.name}`)
      attackingPokemon = this.trainerOne.getPokemon(name)
    }
    else if (this.trainerTwo.getPokemon(name)){
      attackingPlayer = this.trainerTwo
      console.log(`${attackingPlayer.name}`)
      attackingPokemon = this.trainerTwo.getPokemon(name)
    }

    const defendingPokemon = attackingPokemon === this.pokemonOne ? this.pokemonTwo : this.pokemonOne;
    let attackingDamage = attackingPokemon.attackDamage
    let defendingHP = defendingPokemon.hitpoints

    if (defendingHP > 0) {
      if (attackingPokemon.isEffectiveAgainst(defendingPokemon)) {
        attackingDamage = attackingDamage*1.25
        fightMessage +=`${attackingPokemon.name} is effective!\n`
      } else if (attackingPokemon.isWeakTo(defendingPokemon)) {
        attackingDamage = attackingDamage*0.75
        fightMessage += `${attackingPokemon.name} is weak!\n`
      }
      defendingHP = defendingPokemon.takeDamage(attackingDamage)
      fightMessage += `${attackingPokemon.name} used **${attackingPokemon.move}**.\n${defendingPokemon.name} took ${attackingDamage} damage.\n`
      if (defendingHP <= 0) { fightMessage += `${defendingPokemon.name} has fainted. Trainer ${attackingPlayer.name} wins!!!\n`
    }
    }
    if (defendingHP > 0) {
    fightMessage += `${defendingPokemon.name} has ${defendingHP}HP left!\n`
    }
    return fightMessage
  }
}


/*const firePokemon = new Charmander('Charmander', 20, 5, 'fireball')
const waterPokemon = new Squirtle('Squirtle', 20, 5, 'fireball');
const trainer1 = new Trainer("Ash")
const trainer2 = new Trainer("Brock")
trainer1.catch(firePokemon)
trainer2.catch(waterPokemon)
const battle = new Battle(firePokemon, trainer1, waterPokemon, trainer2)

console.log(battle.fight("Charmander"))
console.log(battle.fight("Squirtle"))
console.log(battle.fight("Charmander"))
console.log(battle.fight("Charmander"))
console.log(waterPokemon.hitpoints) */



module.exports = { Pokemon, Fire, Water, Grass, Normal, Charmander, Squirtle, Bulbasaur, Rattata, Pokeball, Trainer, Battle}