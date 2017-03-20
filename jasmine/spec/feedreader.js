/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('the URL exists', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        it('the name exists', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    describe('The menu', function() {
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        //needs to be run in order to work
        describe('toggle', function() {
            //simulates a click event before each test
            beforeEach(function() {
                $('.menu-icon-link').trigger('click');
            });

            it('open works', function() {
                expect($('body').hasClass('menu-hidden')).toBe(false);
            });

            it('close works', function() {
                expect($('body').hasClass('menu-hidden')).toBe(true);
            });
        });
    });

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            $('.feed').empty();
            loadFeed(0, done);
        });

        it('exist when loadFeed is called', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function() {
        var firstContents;
        beforeAll(function(done) {
            loadFeed(0, function() {
                firstContents = $('.feed').text();
                loadFeed(1, done);
            });
        });

        it('changes the content on screen', function() {
            expect($('.feed').text()).not.toEqual(firstContents);
            expect($('.feed').contents().length).not.toBe(0);
        });
    });
}());
