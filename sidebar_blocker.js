// ==UserScript==
// @name         Curtin Sidenav Element Blocker
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Hides the annoying sidebar popups on Curtin sites.
// @author       turbulentgoat
// @match        *://*.curtin.edu.au/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // Add any class names you want to block to this array.
    const CLASSES_TO_BLOCK = [
        'sidenav-ocs-button',
        'sidenav-ocs-container',
        'rn_sidenav open',
        'sidenav-button open',
        "sidenav-overlay on",
        "sidenav-button open",
        "sidenav-ocs-container",
        "rn_sidenav"
    ];

    function hideElements() {

        const selector = CLASSES_TO_BLOCK
            .map(cls => '.' + cls.trim().replace(/\s+/g, '.'))
            .join(', ');

        if (!selector) {
            return;
        }

        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (element.style.display !== 'none') {
                console.log('Hiding element matching selector:', selector, element);
                element.style.display = 'none';
            }
        });
    }


    function fixBodyOverflow() {
        const body = document.body;
        if (body.classList.contains('sidenav-active') && body.style.overflowY !== 'auto') {
            console.log("Body has 'sidenav-active', forcing overflow-y to 'auto'.");
            body.style.overflowY = 'auto';
        }
    }

    function runAllChecks() {
        hideElements();
        fixBodyOverflow();
    }

    runAllChecks();

    const observer = new MutationObserver(mutations => {
        runAllChecks();
    });

    observer.observe(document.body, {
        attributes: true,
        childList: true,
        subtree: true
    });
})();
