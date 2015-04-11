'use strict';

angular.module('arjshivgithubio')
    .controller('MainCtrl', function ($scope) {
        $scope.awesomeThings = [
            {
                'title': 'AngularJS',
                'url': 'https://angularjs.org/',
                'description': 'HTML enhanced for web apps!',
                'logo': 'angular.png'
      },
            {
                'title': 'BrowserSync',
                'url': 'http://browsersync.io/',
                'description': 'Time-saving synchronised browser testing.',
                'logo': 'browsersync.png'
      },
            {
                'title': 'GulpJS',
                'url': 'http://gulpjs.com/',
                'description': 'The streaming build system.',
                'logo': 'gulp.png'
      },
            {
                'title': 'Jasmine',
                'url': 'http://jasmine.github.io/',
                'description': 'Behavior-Driven JavaScript.',
                'logo': 'jasmine.png'
      },
            {
                'title': 'Karma',
                'url': 'http://karma-runner.github.io/',
                'description': 'Spectacular Test Runner for JavaScript.',
                'logo': 'karma.png'
      },
            {
                'title': 'Protractor',
                'url': 'https://github.com/angular/protractor',
                'description': 'End to end test framework for AngularJS applications built on top of WebDriverJS.',
                'logo': 'protractor.png'
      },
            {
                'title': 'Angular Material Design',
                'url': 'https://material.angularjs.org/#/',
                'description': 'The Angular reference implementation of the Google\'s Material Design specification.',
                'logo': 'angular-material.png'
      },
            {
                'title': 'Stylus',
                'url': 'http://learnboost.github.io/stylus/',
                'description': 'Stylus is a revolutionary new language, providing an efficient, dynamic, and expressive way to generate CSS. Supporting both an indented syntax and regular CSS style.',
                'logo': 'stylus.png'
      }
    ];
        angular.forEach($scope.awesomeThings, function (awesomeThing) {
            awesomeThing.rank = Math.random();
        });
    }).controller('TabCtrl', function ($scope) {
        var tabs = [
                /*{
                    title: 'One',
                    content: "Tabs will become paginated if there isn't enough room for them."
                },
                {
                    title: 'Two',
                    content: "You can swipe left and right on a mobile device to change tabs."
                },
                {
                    title: 'Three',
                    content: "You can bind the selected tab via the selected attribute on the md-tabs element."
                },
                {
                    title: 'Four',
                    content: "If you set the selected tab binding to -1, it will leave no tab selected."
                },
                {
                    title: 'Five',
                    content: "If you remove a tab, it will try to select a new one."
                },
                {
                    title: 'Six',
                    content: "There's an ink bar that follows the selected tab, you can turn it off if you want."
                },
                {
                    title: 'Seven',
                    content: "If you set ng-disabled on a tab, it becomes unselectable. If the currently selected tab becomes disabled, it will try to select the next tab."
                },
                {
                    title: 'Eight',
                    content: "If you look at the source, you're using tabs to look at a demo for tabs. Recursion!"
                },*/
                {
                    title: 'Nine',
                    content: "If you set md-theme=\"green\" on the md-tabs element, you'll get green tabs."
                },
                {
                    title: 'Ten',
                    content: "If you're still reading this, you should just go check out the API docs for tabs!"
                }
          ],
            selected = null,
            previous = null;
        $scope.tabs = tabs;
        $scope.selectedIndex = 0;
        $scope.$watch('selectedIndex', function (current, old) {
            selected = tabs[current];
        });
        $scope.addTab = function (title, view) {
            view = view || title + " Content View";
            tabs.push({
                title: title,
                content: view,
                disabled: false
            });
        };
        $scope.removeTab = function (tab) {
            var index = tabs.indexOf(tab);
            tabs.splice(index, 1);
        };
    });