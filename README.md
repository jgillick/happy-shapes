# Happy Cards
A fun game for players, 3 years old and up, and inspired by the
classic [Happy Families](https://en.wikipedia.org/wiki/Happy_Families).

# Description
This github repo is used for generating the cards, which can then be printed out.

# Install and Generate Cards

Here's how to install everything and generate a new deck.

## NVM & Node version

```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
source ~/.bash_profile

nvm install `cat ./.nvmrc`
```

## Dependencies

```sh
npm install
```

## Start server

```sh
npm start
```

Now you can open your browser to:
http://localhost:3000

Clicking "Build" will generate every card and save it to the `cards-generated` directory.