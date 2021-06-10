

# React Cheatsheet

## Purpose

This is intended to serve as a reference for how I've worked with React over the years. Recently, I've introduced the conventions found here into
many of the places I've worked. Most of the conventions are around how I've structured my tests. I have found a tremendous amount of value
in writing tests, but I've also seen many code bases that test things using different conventions than you'll find here.

One of the big sticking points I have with the testing I see most developers using is the overuse of mocking frameworks. Don't get me wrong
mocking frameworks are incredibly powerful and can be intoxicating to use. However, after using mocking frameworks and then maintaining the 
code I was "testing" I have found them to often cause more harm than good. 

In this code base you'll see very little usage of the mocking capabilties in `jest` this is **intentional**.

## Why no mock?

First let me say I don't believe mocking frameworks are bad, however I've found them to be problematic in their use or in most cases over use. For 
instance, I've seen too much test code like this:

```javascript
// subject.spec.js
import {dependency} from './internal-dependency'
import {subject} from './subject'

jest.mock('./internal-dependency', {
    dependency: jest.fn()
});

test('do something useful', () => {
    const result = codeUnderTest({data: 'stuff'});
    expect(dependency).toHaveBeenCalledWith('stuff');
})

// subject.js

import {dependency} from './internal-dependency'

export function subject() {
    dependency('stuff');
}

// internal-dependency.js

export function dependency(value) {
    switch (value) {
      case 'stuff':
          return 'good';
      default:
          return 'bad'
    }
}
```

The issue I have with this code has nothing to do with the mocking framework. The issue here is that we are mocking code we own and control as part 
of the same codebase. Also, the dependency we are mocking doesn't do anything destructive, or have any side effects. This is the kind of mocking I
find problematic. 

The problematic part of this code is that renaming the method `dependency` to `convertToGoodBad` will break the test, unless the developer making the 
change knows to update all places mocking the `./internal-dependency.js` file. Renaming things to better fit what they actually do is extremely 
valuable, however testing things in this way will make doing the right thing harder. 

My goal with asking teams and/or single developers to begin testing their code is to make their code easier and more reliable to change. Utilizing 
a mocking framework in this way makes their code and tests harder to change and less reliable. The reliability part is all about how much trust 
developers place on their testing suite. If the test suite breaks every time I rename something and all of my code updates, but none of my tests
then I'm receiving a lot of false negative feedback. This creates friction to adopting testing practices. In cases where mocking is used too much
developers lose trust in the test suite and therefore fail to see the value the test suite provides. This overall degrades the value that testing
could provide. Any developer that has been asked to test with extensive use of mocking frameworks may have a strong argument against writing
tests. 

