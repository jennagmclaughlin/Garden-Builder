# Garden Builder

JavaScript project. User enters in their city, selects their city, and then a (one-day recommended) list of compatible plants is shown.

## APIs

I want to stick with purely free apis since this is a personal project.

- [Trefle.io](https://docs.trefle.io/)
- Open-Meteo's [Geocoding](https://open-meteo.com/en/docs/geocoding-api) and [Historical Weather](https://open-meteo.com/en/docs/historical-weather-api) APIs.

## Steps

It's a lot more complicated than I thought, because of course it is.

1. Fetch plant data from [Trefle.io](https://docs.trefle.io/) and store a data set to avoid hitting rate limits.
   - Since this is a garden builder, only store vegetables, fruits, flowers, shrubs and trees. That will avoid random wild plants.
   - Limit fields to what I care about: scientific name, common name, image, description, light, min/max precip, min/max temp, native distribution...
2. User enters in their city, use [Geocoding](https://open-meteo.com/en/docs/geocoding-api) to get data. User must also enter how much light their garden will get ("varies," "full sun," "partial," "shade").
   1. A list of options is presented, and they select the one that best matches.
   2. User coordinates and light are stored in local storage.
3. With stored coordinates, use [Historical Weather](https://open-meteo.com/en/docs/historical-weather-api) to get averages over a 10-year period.
   1. Lowest and highest temperature in 10 years (extremes).
   2. Minimum and maximum yearly precipitation.
   3. Skip calculating humidity, it's not important.
   4. Store all of this in user object profile, local storage.
4. Now with that data, go through the stored [Trefle.io](https://docs.trefle.io/) plants and list plants that match all of the criteria. Plants will not be displayed until this point to save my sanity.
   - For lighting, Trefle lights plant lighting in lux. ("Required amount of light, on a scale from 0 (no light, <= 10 lux) to 10 (very intensive insolation, >= 100 000 lux)"). So I need to somehow turn user light question from earlier into an integer.

## Potential Problems

1. Loading. Definitely gonna be super bottle-necked with the data set and images.
   - Lazy load images!!!!
2. Invasive plants. How do I ensure that only non-invasive plants are shown to the user? I don't want to cause ecological chaos.
   - For now a quick and dirty solution is to limit plants by matching native distribution to user's country, since Trefle has a field for that.

## Stuff I want to add, but only once the main steps are done

1. "Best match" where plants are scored based on compatibility with user's area.
   - Could visualize the top 5 or so? Those sideways bar things I don't remember the name of.
   - Explain compatibility scores, for example one could have a tiny note that "rainfall is lower than wanted."
2. Filtering and sorting! Let users filter in/out vegetables, trees, maybe even colors, etc. Sort by best match (see idea above), alphabetical, whatever.
3. Let user select plants they either want in their garden or already have, and then it can be exported to a CSV where they can print it out or edit in Sheets/Excel/etc.
