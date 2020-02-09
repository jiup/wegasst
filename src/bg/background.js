// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.get('uid', function(data0) {
        if (data0 && 'user_exists') {
            chrome.storage.sync.set({status: 'on'});
        } else {
            chrome.storage.sync.set({'uid': null});
            alert("Please bind your membership card first. Thanks!");
            chrome.runtime.openOptionsPage();
        }
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {
                    urlMatches: 'shop.wegmans.com/shop/categories/[0-9]+',
                    // hostEquals: 'shop.wegmans.com',
                    // pathPrefix: '/shop/categories/'
                },
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});