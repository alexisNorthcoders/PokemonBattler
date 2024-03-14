const { default: test } = require('node:test');
const {Pokemon, Fire, Water, Grass, Normal, Squirtle, Charmander, Bulbasaur, Rattata, Pokeball, Trainer, Battle} = require('./pokemon')

describe('pokemon()', () => {
  it('pokemon has name property', () => {
    const testPokemon = new Pokemon('Geodude');
    expect(testPokemon.name).toEqual('Geodude')
  })
  it('pokemon has name & hitpoints & attackDamage property', () => {
    const testPokemon = new Pokemon('Geodude', 20, 5);
    expect(testPokemon.name).toEqual('Geodude')
    expect(testPokemon.hitpoints).toEqual(20)
    expect(testPokemon.attackDamage).toEqual(5)
    expect(typeof testPokemon.attackDamage).toEqual('number')
    expect(typeof testPokemon.hitpoints).toEqual('number')
  })
  it('pokemon has default move property', () => {
    const testPokemon = new Pokemon('Geodude');
    expect(testPokemon.move).toEqual('tackle')
  })
  it('pokemon has default move is replaced with input move', () => {
    const testPokemon = new Pokemon('Geodude', 20, 5, 'throw');
    expect(testPokemon.move).toEqual('throw')
  })
  it('pokemon hitpoints are reduced from takeDamage()', () => {
    const testPokemon = new Pokemon('Geodude', 20, 5, 'throw');
    testPokemon.takeDamage(5);
    expect(testPokemon.hitpoints).toEqual(15)
  })
  it('usedMove() returns pokemons attack damage', () => {
    const testPokemon = new Pokemon('Geodude', 20, 5, 'throw');
    const actualOutput = testPokemon.useMove();
    expect(actualOutput).toEqual(5)
  })
  it('hasFainted() returns boolean if hitpoints are equal or less than 0', () => {
    const testPokemon = new Pokemon('Geodude', 20, 5, 'throw');
    testPokemon.takeDamage(20)
    const actualOutput = testPokemon.hasFainted()
    expect(actualOutput).toEqual(true)
  })
  it('hasFainted() returns boolean if hitpoints are equal or less than 0', () => {
    const testPokemon = new Pokemon('Geodude', 20, 5, 'throw');
    testPokemon.takeDamage(15)
    const actualOutput = testPokemon.hasFainted()
    expect(actualOutput).toEqual(false)
  })
  it('Fire pokemon is type fire', () => {
    const firePokemon = new Fire('Charmander', 20, 5, 'fireball');
    const actualOutput = firePokemon.type
    expect(actualOutput).toEqual('Fire')
  })
  it('pokemon is equal to type', () => {
    const waterPokemon = new Water('Charmander', 20, 5, 'fireball');
    const actualOutput1 = waterPokemon.type
    const grassPokemon = new Grass('Charmander', 20, 5, 'fireball');
    const actualOutput2 = grassPokemon.type
    const normalPokemon = new Normal('Charmander', 20, 5, 'fireball');
    const actualOutput3 = normalPokemon.type
    expect(actualOutput1).toEqual('Water')
    expect(actualOutput2).toEqual('Grass')
    expect(actualOutput3).toEqual('Normal')
  })
  it('Fire pokemon is effective against grass - returns boolean value', () => {
    const firePokemon = new Fire('Charmander', 20, 5, 'fireball');
    const grassPokemon = new Grass('Bulbasaur', 20, 5, 'leaf');
    const actualOutput = firePokemon.isEffectiveAgainst(grassPokemon)
    expect(actualOutput).toEqual(true)
  })
  it('return boolean if effective against pokemon type', () => {
    const waterPokemon = new Water('Bulbasaur', 20, 5, 'fireball');
    const grassPokemon = new Grass('Charmander', 20, 5, 'fireball');
    const normalPokemon = new Normal('Charmander', 20, 5, 'fireball');
    const actualOutput1 = waterPokemon.isEffectiveAgainst(grassPokemon)
    const actualOutput2 = grassPokemon.isEffectiveAgainst(waterPokemon)
    const actualOutput3 = normalPokemon.isEffectiveAgainst(waterPokemon)
    expect(actualOutput1).toEqual(false)
    expect(actualOutput2).toEqual(true)
    expect(actualOutput3).toEqual(false)
  })
  it('return boolean if is weak against pokemon type', () => {
    const firePokemon = new Fire('Bulbasaur', 20, 5, 'fireball');
    const waterPokemon = new Water('Bulbasaur', 20, 5, 'fireball');
    const grassPokemon = new Grass('Charmander', 20, 5, 'fireball');
    const normalPokemon = new Normal('Charmander', 20, 5, 'fireball');
    const actualOutput1 = waterPokemon.isWeakTo(grassPokemon)
    const actualOutput2 = grassPokemon.isWeakTo(waterPokemon)
    const actualOutput3 = normalPokemon.isWeakTo(waterPokemon)
    const actualOutput4 = firePokemon.isWeakTo(waterPokemon)
    expect(actualOutput1).toEqual(true)
    expect(actualOutput2).toEqual(false)
    expect(actualOutput3).toEqual(false)
    expect(actualOutput4).toEqual(true)
  })
  it('pokemon has correct move and type', () => {
    const firePokemon = new Charmander('Bulbasaur', 20, 5, 'fireball');
    const waterPokemon = new Squirtle('Bulbasaur', 20, 5, 'fireball');
    const grassPokemon = new Bulbasaur('Charmander', 20, 5, 'fireball');
    const normalPokemon = new Rattata('Charmander', 20, 5, 'fireball');
    expect(waterPokemon.type).toEqual('Water')
    expect(grassPokemon.type).toEqual('Grass')
    expect(normalPokemon.type).toEqual('Normal')
    expect(firePokemon.type).toEqual('Fire')
    expect(firePokemon.move).toEqual('Ember')
    expect(waterPokemon.move).toEqual('Water Gun')
    expect(grassPokemon.move).toEqual('Vine Whip')
    expect(normalPokemon.move).toEqual('Tackle')
  })
})
describe('pokeball()', () => {
  it('check if pokeball has pokemon property', () => {
    const firePokemon = new Charmander('Bulbasaur', 20, 5, 'fireball');
    const pokeball = new Pokeball(firePokemon)
    expect(pokeball.pokemon).toEqual(firePokemon)
  })
  it('check if pokeball is empty', () => {
    const pokeball = new Pokeball()
    const actualOutput = pokeball.isEmpty()
    expect(actualOutput).toEqual(true)
  })
  it('check if pokeball is not empty', () => {
    const firePokemon = new Charmander('Bulbasaur', 20, 5, 'fireball');
    const pokeball = new Pokeball(firePokemon)
    const actualOutput = pokeball.isEmpty()
    expect(actualOutput).toEqual(false)
  })
  it('return name of pokemon inside pokeball', () => {
    const firePokemon = new Charmander('Charmander', 20, 5, 'fireball');
    const pokeball = new Pokeball(firePokemon)
    const actualOutput = pokeball.contains()
    expect(actualOutput).toEqual(firePokemon.name)
  })
  it('return empty if there are no pokemon inside pokeball', () => {
    const pokeball = new Pokeball()
    const actualOutput = pokeball.contains()
    expect(actualOutput).toEqual('Empty')
  })
  it('if throw() has no argumnt - go pokemon', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const firePokemon = new Charmander('Charmander', 20, 5, 'fireball');
    const pokeball = new Pokeball(firePokemon)
    pokeball.throw()
    expect(consoleSpy).toHaveBeenCalledWith('Go Charmander!!')
  })
  it('if throw() has an argumnt - and pokeball is empty', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const firePokemon = new Charmander('Charmander', 20, 5, 'fireball');
    const pokeball = new Pokeball()
    pokeball.throw(firePokemon)
    expect(consoleSpy).toHaveBeenCalledWith('You caught Charmander')
  })
  it('if throw() has no argumnt & pokeball is empty', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const pokeball = new Pokeball()
    pokeball.throw()
    expect(consoleSpy).toHaveBeenCalledWith('Pokeball Empty!')
  })
  it('if throw() has an argumnt & pokeball is full', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const firePokemon = new Charmander('Charmander', 20, 5, 'fireball')
    const waterPokemon = new Squirtle('Bulbasaur', 20, 5, 'fireball');
    const pokeball = new Pokeball(waterPokemon)
    pokeball.throw(firePokemon)
    expect(consoleSpy).toHaveBeenCalledWith('Pokeball full')
  })
  it('if at least one pokeball in belt is empty catch pokemon', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const firePokemon = new Charmander('Charmander', 20, 5, 'fireball')
    const trainer = new Trainer()
    const actualOutput = trainer.catch(firePokemon)
    expect(actualOutput).toEqual(true)
  })  
  it('if pokebelt is full return false', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const firePokemon = new Charmander('Charmander', 20, 5, 'fireball')
    const trainer = new Trainer()
    trainer.catch(firePokemon)
    trainer.catch(firePokemon)
    trainer.catch(firePokemon)
    trainer.catch(firePokemon)
    trainer.catch(firePokemon)
    trainer.catch(firePokemon)
    const actualOutput = trainer.catch(firePokemon)
    expect(actualOutput).toEqual(false)
  })
  it('throw pokemon with same name as argument', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const firePokemon = new Charmander('Charmander', 20, 5, 'fireball')
    const trainer = new Trainer()
    trainer.catch(firePokemon)
    const actualOutput = trainer.getPokemon('Charmander')
    expect(actualOutput).toEqual(firePokemon)
  })
  it('throw pokemon with same name as argument', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const firePokemon = new Charmander('Charmander', 20, 5, 'fireball')
    const waterPokemon = new Squirtle('Squirtle', 20, 5, 'fireball');
    const trainer = new Trainer()
    trainer.catch(firePokemon)
    trainer.catch(waterPokemon)
    const actualOutput1 = trainer.getPokemon('Charmander')
    const actualOutput2 = trainer.getPokemon('Squirtle')
    expect(actualOutput1).toEqual(firePokemon)
    expect(actualOutput2).toEqual(waterPokemon)
  })
})
describe('Fight()', () => {
  it('pokemon1 takes damage from pokemon2', () => {
    const firePokemon = new Charmander('Charmander', 20, 5, 'fireball')
    const waterPokemon = new Squirtle('Squirtle', 20, 5, 'fireball');
    const trainer1 = new Trainer("Ash")
    const trainer2 = new Trainer("Brock")
    trainer1.catch(firePokemon)
    trainer2.catch(waterPokemon)
    const battle = new Battle(firePokemon, trainer1, waterPokemon, trainer2)
    battle.fight("Squirtle")
    expect(firePokemon.hitpoints).toEqual(13.75)
  })
  it('The pokemon continue to fight if HP are more then 0 and effective against', () => {
    const firePokemon = new Charmander('Charmander', 20, 5, 'fireball')
    const waterPokemon = new Squirtle('Squirtle', 20, 5, 'fireball');
    const trainer1 = new Trainer("Ash")
    const trainer2 = new Trainer("Brock")
    trainer1.catch(firePokemon)
    trainer2.catch(waterPokemon)
    const battle = new Battle(firePokemon, trainer1, waterPokemon, trainer2)
    battle.fight("Squirtle")
    battle.fight("Charmander")
    battle.fight("Squirtle")
    battle.fight("Charmander")
    battle.fight("Squirtle")
    expect(firePokemon.hitpoints).toEqual(1.25)
  })
  it('The pokemon continue to fight if HP are more then 0 and effective against and has fainted', () => {
    const firePokemon = new Charmander('Charmander', 20, 5, 'fireball')
    const waterPokemon = new Squirtle('Squirtle', 20, 5, 'fireball');
    const trainer1 = new Trainer("Ash")
    const trainer2 = new Trainer("Brock")
    trainer1.catch(firePokemon)
    trainer2.catch(waterPokemon)
    const battle = new Battle(firePokemon, trainer1, waterPokemon, trainer2)
    battle.fight("Squirtle")
    battle.fight("Charmander")
    battle.fight("Squirtle")
    battle.fight("Charmander")
    battle.fight("Squirtle")
    battle.fight("Charmander")
    const actualOutput = battle.fight("Squirtle")
    expect(actualOutput.endsWith('Charmander has fainted. Trainer Brock wins!!!')).toEqual(true)
  })
  it('The pokemon continue to fight if HP are more then 0 & is weak against defending pokemon', () => {
    const firePokemon = new Charmander('Charmander', 20, 5, 'fireball')
    const waterPokemon = new Squirtle('Squirtle', 20, 5, 'fireball');
    const trainer1 = new Trainer("Ash")
    const trainer2 = new Trainer("Brock")
    trainer1.catch(firePokemon)
    trainer2.catch(waterPokemon)
    const battle = new Battle(firePokemon, trainer1, waterPokemon, trainer2)
    const actualOutput = battle.fight("Charmander")
    expect(actualOutput.startsWith('Charmander is weak!')).toEqual(true)
  })
})