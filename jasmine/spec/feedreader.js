$(function() {
    // The next series of test involve the RSS feed
    describe('RSS Feeds', () => {
        /* The following test will determine
         * A - if the allFeeds variable is defined
         * B - makes sure it is not empty
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* The next test will loop through each URL key in the allFeeds object
         * Test fails if the URL is null or has an empty string
         * Test succeeds if URL is defined
         */
        it ('has a url', () => {
            allFeeds.forEach(element => {
                expect(element.url).toBeDefined();
                expect(element.url).not.toBe(null || ''); 
            });
        });

        /* Identical test to the URL one, but with the NAME key
         * Test fails if the URL is null or has an empty string
         * Test succeeds if URL is defined
         */
        it ('has a name', () => {
            allFeeds.forEach(element => {
                expect(element.name).toBeDefined();
                expect(element.name).not.toBe(null || '');
            });
        });
    });

    // The next series of test involve the clickable menu
    describe("The Menu", () => {
        /* The following test checks the body's class
         *  Test succeeds if menu-hidden is found
         */
        it('is hidden when loaded', () => {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });

        /* The next test includes two exceptions
         * 1 - Checks if a click closed the menu
         * 2 - Checks if a click opened the menu
         * The first exception is true because it needs to
         * match the default state of the menu
         */
        it('menu is clicked', () => {
            const menuIcon = $('.menu-icon-link');

            // trigger test for if the menu is shown
            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toEqual(false);

            // trigger test for if the menu is hidden
            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
    });
   
    // The next series of test involve the individual entries
    describe("Initial Entries", () => {
        // Loads first feed before checking entries
        beforeEach((done) => {
            loadFeed(0, () => {
                done();
            });
        });

        // Checks to see if the feed has an entry
        it('has atleast one entry', () => {
            expect($('.feed .entry').length).not.toBe(0);
        });
    });

    // The following suite will test if new content is loaded    
    describe('News Feed Selection', () => {
        let currentFeed,
            newFeed;

        // loads both feeds before comparing the two
        beforeEach((done) => {
            loadFeed(0, () => {
                currentFeed = $('.feed').html();
                loadFeed(1, () => {
                    newFeed = $('.feed').html();
                    done();
                });
            });
        });

        // compares the two feeds to see if they're the same
        it('has loaded new content', () => {
            expect(currentFeed).not.toEqual(newFeed);
        });
    }); 

}());
