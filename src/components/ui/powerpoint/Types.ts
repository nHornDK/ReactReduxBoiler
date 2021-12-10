type PropEventSource<TModel> = {
	[key in keyof TModel as `on${Capitalize<string & key>}Changed`]: (newValue: TModel) => void;
};

type WatchedModel<TModel> = TModel & PropEventSource<TModel>;

interface PersonModel {
	firstName: string;
	lastName: string;
}

const person: PersonModel = {
	firstName: 'Mikkel',
	lastName: 'Horn',
};

const WatchedPerson: WatchedModel<PersonModel> = {
	...person,
	onFirstNameChanged: (person) => console.log(person),
	onLastNameChanged: (person) => console.log(person),
};

interface AddressModel {
	streetAddress: string;
	city: string;
	zip: number;
}
type PersonDetailed = PersonModel & AddressModel;

const personWithAddress: PersonDetailed = {
	firstName: 'Mikkel',
	lastName: 'Horn',
	streetAddress: 'Søhøjparken 15',
	city: 'Trige',
	zip: 8380,
};

interface PersonModel2 {
	firstName: string;
	lastName: string;
	age: number;
	gender: 'male' | 'female';
}

const personDetailed: PersonModel2 = {
	firstName: 'Mikkel',
	lastName: 'Horn',
	age: 33,
	gender: 'male',
};

type NumberOrFemale = number | 'female';
const testType1: NumberOrFemale = 33;
const testType2: NumberOrFemale = 'female';
const testType3: NumberOrFemale = 'male';

console.log(testType1, testType2, testType3, personDetailed, personWithAddress, WatchedPerson);
