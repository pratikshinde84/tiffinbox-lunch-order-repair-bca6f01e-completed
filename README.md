## Task Overview

TiffinBox is a small office-lunch service. Every morning employees open a web page, look at today's lunch menu, optionally hide the non-vegetarian dishes, and place an order for one dish with a quantity. The page is built in React and talks to a small Node.js API that keeps today's menu and the placed orders in memory. After the last release a few things stopped working the way the team expects.

## Objectives

- Ticking the 'Veg only' checkbox is supposed to show only vegetarian dishes, but every dish still appears whether or not the box is ticked.
- Placing an order with a quantity of zero or a huge quantity still goes through and reports success, and an order for a dish that isn't on today's menu fails with a confusing server error instead of a clear message.
- After ticking or unticking 'Veg only', the menu on screen never changes until the page is reloaded by hand.

## Helpful Tips

- Consider following a single request from the page to the API and back, and compare what the page sends with what the route expects to receive.
- Consider calling the API on its own, without the page, to work out which side each problem lives on.
- Review when the page decides to ask the API for fresh data, and whether that happens again after the checkbox changes.
- Explore what the order route checks before it saves an order, and what it does not check yet.

## How to Verify

- Asking the menu for veg only returns only vegetarian dishes, and asking without the filter returns all dishes again.
- Ordering with quantity 0 or 50, or for a dish id that isn't listed, gives a clear rejection instead of a success.
- Place a normal order and confirm it succeeds and shows the correct total.
- Running `npm test` from the repository root passes every test.
