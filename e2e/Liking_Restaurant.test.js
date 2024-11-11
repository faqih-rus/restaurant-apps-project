const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('.content__heading');
  I.see('Your Favorite Restaurants', '.content__heading');
  I.see('You have no favorite restaurants yet.', '.empty-favorite');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('You have no favorite restaurants yet.', '.empty-favorite');
  I.amOnPage('/');

  I.waitForElement('.restaurant-item__title a', 10);
  const firstRestaurantTitle = await I.grabTextFrom('.restaurant-item__title a');
  const normalizedFirstTitle = firstRestaurantTitle.trim();
  I.click('.restaurant-item__title a');

  I.waitForElement('#likeButton', 10);
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.waitForElement('.restaurant-item', 10);
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant-item__title');
  const normalizedLikedTitle = likedRestaurantTitle.trim();

  assert.strictEqual(normalizedFirstTitle, normalizedLikedTitle);
});

Scenario('searching restaurants', async ({ I }) => {
  I.amOnPage('/');
  I.waitForElement('#searchRestaurant', 10);
  I.waitForElement('.restaurant-item', 10);

  const titles = await I.grabTextFromAll('.restaurant-item__title');
  const normalizedTitles = titles.map((title) => title.trim());

  const searchQuery = normalizedTitles[0].substring(1, 3).toLowerCase();
  I.fillField('#searchRestaurant', searchQuery);
  I.wait(2);

  const visibleRestaurants = await I.grabTextFromAll('.restaurant-item__title');
  const matchingRestaurants = normalizedTitles.filter((title) =>
    title.toLowerCase().includes(searchQuery)
  );

  visibleRestaurants.forEach((title) => {
    assert.ok(
      title.toLowerCase().includes(searchQuery),
      `Restaurant "${title}" should contain search query "${searchQuery}"`
    );
  });
});

Scenario('unliking a restaurant', async ({ I }) => {
	I.amOnPage('/#/favorite');
	I.see('You have no favorite restaurants yet.', '.empty-favorite');
	
	I.amOnPage('/');
	I.waitForInvisible('.loading', 30);
	I.waitForVisible('.restaurant-item__title a', 30);

	I.click(locate('.restaurant-item__title a').first());

	I.waitForInvisible('.loading', 30);
	I.waitForVisible('#likeButton', 30);

	I.click('#likeButton');
	I.click('#likeButton');
	
	I.amOnPage('/#/favorite');
	I.see('You have no favorite restaurants yet.', '.empty-favorite');
  });

Scenario('liking multiple restaurants', async ({ I }) => {
	I.amOnPage('/');
  I.waitForElement('.restaurant-item__title a', 10);

  const restaurantTitles = await I.grabTextFromAll('.restaurant-item__title a');
  for (const title of restaurantTitles) {
	I.click(locate('.restaurant-item__title a').withText(title));
	I.waitForElement('#likeButton', 10);
	I.click('#likeButton');
	I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.waitForElement('.restaurant-item', 10);
  const likedRestaurantTitles = await I.grabTextFromAll('.restaurant-item__title');

  assert.strictEqual(restaurantTitles.length, likedRestaurantTitles.length);

  restaurantTitles.forEach((title) => {
	const normalizedTitle = title.trim();
	assert.ok(
	  likedRestaurantTitles.includes(normalizedTitle),
	  `Restaurant "${normalizedTitle}" should be liked`
	);
  });
});