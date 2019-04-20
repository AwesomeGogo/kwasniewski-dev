var animateApp = angular.module('animateApp',['ngRoute','ngAnimate']);


animateApp.config(function($routeProvider,$locationProvider){
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'mainController'
        })
        .when('/about', {
            templateUrl: 'pages/about.html',
            controller: 'aboutController'
        })
        .when('/contact', {
            templateUrl: 'pages/contact.html',
            controller: 'contactController'
        })
        .otherwise({redirectTo:'/'});
});
animateApp.directive('particlesDrv', ['$window', '$log', particlesDrv]);
animateApp.controller('particlesCtrl', ['$scope', particlesCtrl]);

animateApp.controller('mainController', function($scope){
    $scope.pageClass= "page-home";

});



animateApp.controller('aboutController', function($scope,$interval){
    $scope.pageClass = 'page-about';

    var content = "Jestem młodym ambitnym mężczyzną który ciągle dąży do celu. Uwielbiam poznawać nowych ludzi i wymieniać się swoimi doświadczeniami. Zawsze pozytywnie nastawiony i gotowy do podjęcia ryzyka.";
    $scope.type = "";
    var i=0;
    var timer = $interval(function(){
        if(i<content.length)
            $scope.type += content[i];
        else {
            $interval.cancel(timer);
        }
        i++;
    }, 70);

});

animateApp.controller('contactController', function($scope){
    $scope.pageClass= 'page-contact';
});

function particlesCtrl($scope) {
    $scope.showParticles = true;
}

function particlesDrv($window, $log) {
    return {
        restrict: 'A',
        template: '<div class="particleJs" id="particleJs"><a ng-click=\'navElement("services")\'" class="scroll-down nav-link"><i class="fas fa-arrow-down glowing"></i>\n' +
        '\n</a></div>',
        link: function(scope, element, attrs, fn) {
            $window.particlesJS('particleJs', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: '#FFFFFF'
                    },
                    shape: {
                        type: "circle",
                        polygon: {
                            nb_sides: 5
                        }
                    },
                    opacity: {
                        value: 0.5,
                        random: false,
                        anim: {
                            enable: false,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 5,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 40,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#ffffff',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 6,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'grab'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        bubble: {
                            distance: 400,
                            size: 40,
                            duration: 2,
                            opacity: 8,
                            speed: 3
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4
                        },
                        push: {
                            particles_nb: 4
                        },
                        remove: {
                            particles_nb: 2
                        }
                    }
                },
                retina_detect: true
            });
        }
    };
}

animateApp.controller('contentCtrl', ['$scope', '$location', '$anchorScroll',
    function($scope, $location, $anchorScroll) {
        $scope.navElement = function(elementid) {
            // set the location.hash
            $location.hash(elementid);
            $anchorScroll();
            $location.hash('');
            $location.replace();
        };
    }
]);


$(".menu-item").on("click",function(){
    if ($(window).width() < 768) {
        $('.drawer').drawer('close');
    }
});

$(document).ready(function() {
    $('.drawer').drawer();
});

animateApp.controller("cfController",function($scope, $http){
    $scope.submitForm = function(isValid) {
        this.formInput = {
            name: $("input[name='name']").val(),
            email: $("input[name='email']").val(),
            message: $("textarea[name='private']").val()
        };

        if (isValid) {
            $http({
                method  : 'POST',
                url     : 'mailer.php',
                data    :   this.formInput,
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            $('#form-messages').addClass('done');
            $('#form-messages').text("Wiadomość została wysłana pomyślnie")

        } else {
            $('#form-messages').addClass('failed');
            $('#form-messages').text("Nie udało się wysłać wiadomości")
        }
    };
});
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
animateApp.controller("fader-controller",function($scope,$http){
    let item = document.getElementById('fader-diagram-your-app');
    let coloredImage = document.getElementById("fader-diagram-modern-java-color");
    let fader = document.getElementById("fader");
    fader.style.left = 0 + "px";
    coloredImage.style.width = 0 + "px";
    item.onmousemove = function(e){
        let b = document.body;
        let x = e.clientX + b.scrollLeft;
        let co = document.body.clientWidth;
        let no = document.getElementById('fader-diagram-your-app').offsetWidth;
        let end = (co-no)/2;
        let final = x - end;
        fader.style.left = final + "px";
        coloredImage.style.width =  final + "px";
    };
});
window.loading_screen.finish();


