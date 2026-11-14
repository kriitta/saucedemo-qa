# SauceDemo QA: manual testing to multi-tool automation

A self-directed QA practice project on the public demo shop [saucedemo.com](https://www.saucedemo.com).
It covers the test process end to end (planning, design, execution, defect reporting, UAT, regression scope)
and automates the same flows with three tools to compare them first-hand.

This is a practice project on a public demo app, not production work.
The demo app has deliberately broken accounts (`problem_user`, `error_user`) which are used to practice finding defects.

## What is in here

| Area | Contents |
|---|---|
| Manual | Test plan, 18 scenarios, 23 test cases (EP / BVA / decision table / state transition), execution log, 2 bug reports, UAT document, regression scope |
| Playwright (TypeScript) | 23 cases, run on chromium, firefox and webkit (69 test runs) |
| Cypress (JavaScript) | 11 cases (login, cart, checkout, sort) |
| Selenium WebDriver + Mocha (JavaScript) | 11 cases, same flows as Cypress |
| Comparison | [docs/tool-comparison.md](docs/tool-comparison.md): what differed between the three tools in practice, with setup problems and timings |

## Results

- Manual execution: 23 cases run, 21 pass, 2 fail (both are known defects of the demo accounts)
- BUG-001 (High): `problem_user` sees the same image for every product
- BUG-002 (Medium): `error_user` cannot remove an item with the Remove button on the Products page.
  Removing from the Cart page works. The first version of this report put the bug on the Cart page and rated it High;
  an expected-fail automated test that unexpectedly passed led to a re-check, and the report was corrected and downgraded
  (see the revision note inside [BUG-002](docs/bug-reports/BUG-002.md))
- Automation: all suites pass locally. Bug cases are written as expected-fail tests (`test.fail()`), so they flag the day a bug gets fixed

## Repository layout

~~~
docs/                 manual test documents
playwright-tests/     Playwright suite
cypress-tests/        Cypress suite
selenium-tests/       Selenium suite
~~~

## Running the suites

Playwright:

~~~bash
cd playwright-tests
npm install
npx playwright install
npx playwright test
~~~

Cypress:

~~~bash
cd cypress-tests
npm install
npx cypress run
~~~

Selenium (needs Chrome installed):

~~~bash
cd selenium-tests
npm install
npm test
~~~

## Things I learned

- Auto-waiting matters. The same login check passed in Playwright and Cypress but failed in Selenium until I wrote an explicit wait.
- Automation can correct manual notes. A test that "passed when it should fail" exposed a wrong bug location in my own report.
- Tooling setup is part of the job: Mocha/Node version mismatch, macOS blocking chromedriver, and a stale chromedriver in the PATH all had to be solved before the Selenium suite ran.
