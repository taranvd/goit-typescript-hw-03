abstract class House {
  protected door: boolean = false;
  public readonly tenants: Person[] = [];

  constructor(protected key: Key) {
    this.key = key;
  }

  public comeIn(tenant: Person) {
    if (this.door) {
      this.tenants.push(tenant);
    }
  }

  public abstract openDoor(doorKey: Key): void;
}
class MyHouse extends House {
  constructor(key: Key) {
    super(key);
  }

  public openDoor(doorKey: Key): void {
    if (doorKey.getSignature() === this.key.getSignature() && !this.door) {
      this.door = true;
    }
  }
}

class Key {
  constructor(private signature: number) {
    this.signature = signature;
  }

  getSignature() {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key, public name: string) {
    this.key = key;
    this.name = name;
  }

  getKey() {
    return this.key;
  }
}

const key = new Key(Date.now());

const house = new MyHouse(key);
const person = new Person(key, "Repeta");

house.openDoor(person.getKey());

house.comeIn(person);

console.log(house.tenants);

//*

export {};
