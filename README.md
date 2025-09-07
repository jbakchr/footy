# footy

Global CLI for showing football league table standings in the terminal for:

- Superligaen (sl)
- Premier League (pl)
- La Liga (ll)
- Bundesliga (bl)
- Seria A (sa)
- Ligue 1 (l1)

## Installation

Install globally using npm:

```sh
npm install -g footy
```

## Example usage

To show the current league standing for one of the above mentioned leagues, use the abbreviation as an argument.

Here's an example for the Premier League (pl) as of **_2025-04-23_**:

```sh
footy pl
```

This will produce the following output in your terminal:

```
┌────┬─────────────────────────┬────┬────┬────┬────┬─────┐
│  # │ Team                    │ Pl │  W │  D │  L │ Pts │
├────┼─────────────────────────┼────┼────┼────┼────┼─────┤
│  1 │ Liverpool               │ 33 │ 24 │  7 │  2 │  79 │
│  2 │ Arsenal                 │ 33 │ 18 │ 12 │  3 │  66 │
│  3 │ Manchester City         │ 34 │ 18 │  7 │  9 │  61 │
│  4 │ Nottingham Forest       │ 33 │ 18 │  6 │  9 │  60 │
│  5 │ Newcastle United        │ 33 │ 18 │  5 │ 10 │  59 │
│  6 │ Chelsea                 │ 33 │ 16 │  9 │  8 │  57 │
│  7 │ Aston Villa             │ 34 │ 16 │  9 │  9 │  57 │
│  8 │ AFC Bournemouth         │ 33 │ 13 │ 10 │ 10 │  49 │
│  9 │ Fulham                  │ 33 │ 13 │  9 │ 11 │  48 │
│ 10 │ Brighton & Hove Albion  │ 33 │ 12 │ 12 │  9 │  48 │
│ 11 │ Brentford               │ 33 │ 13 │  7 │ 13 │  46 │
│ 12 │ Crystal Palace          │ 33 │ 11 │ 11 │ 11 │  44 │
│ 13 │ Everton                 │ 33 │  8 │ 14 │ 11 │  38 │
│ 14 │ Manchester United       │ 33 │ 10 │  8 │ 15 │  38 │
│ 15 │ Wolverhampton Wanderers │ 33 │ 11 │  5 │ 17 │  38 │
│ 16 │ Tottenham Hotspur       │ 33 │ 11 │  4 │ 18 │  37 │
│ 17 │ West Ham United         │ 33 │  9 │  9 │ 15 │  36 │
│ 18 │ Ipswich Town            │ 33 │  4 │  9 │ 20 │  21 │
│ 19 │ Leicester City          │ 33 │  4 │  6 │ 23 │  18 │
│ 20 │ Southampton             │ 33 │  2 │  5 │ 26 │  11 │
└────┴─────────────────────────┴────┴────┴────┴────┴─────┘
```

## Options

One can use the following options for outputting either the legaue standing, topscorers, assists or cards:

- standing (default)
- goals
- assists
- cards

### Example use of option

To show the topscorers for a league instead of the (default) standing, one would execute the following command:

```sh
footy pl -s goals
```

## License

MIT
