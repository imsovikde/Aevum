var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var defaultSettings = {
    dob: '2000-01-01',
    lifeExpectancy: 80,
    subDayPrecision: 'milliseconds',
    shape: 'square',
    size: 80,
    unitPrecision: 'weeks',
    timerFontSize: 6,
    transparentTimer: false,
    boldTimer: false,
    showAge: false,
    theme: 'dark'
};
document.addEventListener('DOMContentLoaded', function () {
    // --- Core Variables ---
    var settings = __assign({}, defaultSettings);
    var animationFrameId;
    var activeNodeData = {
        element: null,
        startMs: 0,
        endMs: 0
    };
    // --- Map New Elements ---
    var gridContainer = document.getElementById('grid-container');
    var timerDisplay = document.getElementById('timer-display');
    var overlayContainer = document.getElementById('overlay-container');
    var settingsPanel = document.getElementById('settings-panel');
    var settingsToggle = document.getElementById('settings-toggle');
    var closeSettings = document.getElementById('close-settings');
    // DOB group
    var dobYear = document.getElementById('dob-year');
    var dobMonth = document.getElementById('dob-month');
    var dobDay = document.getElementById('dob-day');
    var lifeExpectancyInput = document.getElementById('life-expectancy-input');
    var sizeInput = document.getElementById('size-input');
    var fontSizeInput = document.getElementById('font-size-input');
    // Custom Controls (Toggles)
    var transparentTimerToggle = document.getElementById('transparent-timer');
    var boldTimerToggle = document.getElementById('bold-timer');
    var showAgeToggle = document.getElementById('show-age');
    // Custom Controls (Segmented)
    var precisionGroup = document.getElementById('precision-group');
    var shapeGroup = document.getElementById('shape-group');
    var unitPrecisionGroup = document.getElementById('unit-precision-group');
    // Lists for Cycle
    var precisionOptions = ['years', 'months', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'];
    var unitWeights = {
        'years': 6,
        'months': 5,
        'days': 4,
        'hours': 3,
        'minutes': 2,
        'seconds': 1,
        'milliseconds': 0
    };
    // --- Storage ---
    function loadSettings() {
        return __awaiter(this, void 0, void 0, function () {
            var api_1, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        api_1 = typeof chrome !== 'undefined' && chrome.storage ? chrome : window.browser;
                        if (!(api_1 && api_1.storage)) return [3 /*break*/, 2];
                        return [4 /*yield*/, new Promise(function (resolve) {
                                api_1.storage.local.get('settings', function (res) { return resolve(res); });
                            })];
                    case 1:
                        result = _a.sent();
                        if (result.settings) {
                            settings = __assign(__assign({}, defaultSettings), result.settings);
                        }
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error('Error loading settings:', e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function saveSettings() {
        return __awaiter(this, void 0, void 0, function () {
            var api_2, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        api_2 = typeof chrome !== 'undefined' && chrome.storage ? chrome : window.browser;
                        if (!(api_2 && api_2.storage)) return [3 /*break*/, 2];
                        return [4 /*yield*/, new Promise(function (resolve) {
                                api_2.storage.local.set({ settings: settings }, function () { return resolve(); });
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        console.error('Error saving settings:', e_2);
                        return [3 /*break*/, 4];
                    case 4:
                        renderGrid();
                        applyAppearance();
                        updateVisibility();
                        return [2 /*return*/];
                }
            });
        });
    }
    function applyAppearance() {
        var size = settings.timerFontSize || 6;
        document.documentElement.style.setProperty('--timer-font-size', "".concat(size, "rem"));
        document.documentElement.setAttribute('data-theme', settings.theme || 'dark');
        if (overlayContainer) {
            if (settings.transparentTimer) {
                overlayContainer.classList.add('transparent');
            }
            else {
                overlayContainer.classList.remove('transparent');
            }
        }
        if (timerDisplay) {
            if (settings.boldTimer) {
                timerDisplay.classList.add('bold-timer');
            }
            else {
                timerDisplay.classList.remove('bold-timer');
            }
        }
    }
    // --- UI Binding ---
    function syncStateToUI() {
        var parts = settings.dob.split('-');
        var y = parts[0] || '';
        var m = parts[1] || '';
        var d = parts[2] || '';
        if (dobYear)
            dobYear.value = y;
        if (dobMonth)
            dobMonth.value = m;
        if (dobDay)
            dobDay.value = d;
        if (lifeExpectancyInput)
            lifeExpectancyInput.value = settings.lifeExpectancy.toString();
        if (sizeInput)
            sizeInput.value = settings.size.toString();
        if (fontSizeInput)
            fontSizeInput.value = (settings.timerFontSize || 6).toString();
        // Toggles
        if (transparentTimerToggle)
            transparentTimerToggle.setAttribute('aria-checked', settings.transparentTimer.toString());
        if (boldTimerToggle)
            boldTimerToggle.setAttribute('aria-checked', settings.boldTimer.toString());
        if (showAgeToggle)
            showAgeToggle.setAttribute('aria-checked', settings.showAge.toString());
        // Segmented Buttons
        if (precisionGroup) {
            Array.from(precisionGroup.children).forEach(function (btn) {
                if (btn instanceof HTMLButtonElement) {
                    if (btn.getAttribute('data-value') === settings.subDayPrecision)
                        btn.classList.add('active');
                    else
                        btn.classList.remove('active');
                }
            });
        }
        if (shapeGroup) {
            Array.from(shapeGroup.children).forEach(function (btn) {
                if (btn instanceof HTMLButtonElement) {
                    if (btn.getAttribute('data-value') === settings.shape)
                        btn.classList.add('active');
                    else
                        btn.classList.remove('active');
                }
            });
        }
        if (unitPrecisionGroup) {
            Array.from(unitPrecisionGroup.children).forEach(function (btn) {
                if (btn instanceof HTMLButtonElement) {
                    if (btn.getAttribute('data-value') === settings.unitPrecision)
                        btn.classList.add('active');
                    else
                        btn.classList.remove('active');
                }
            });
        }
        var themeGroup = document.getElementById('theme-group');
        if (themeGroup) {
            Array.from(themeGroup.querySelectorAll('.theme-btn')).forEach(function (btn) {
                if (btn.getAttribute('data-theme') === (settings.theme || 'dark')) {
                    btn.classList.add('active');
                }
                else {
                    btn.classList.remove('active');
                }
            });
        }
    }
    function getDobFromInputs() {
        var y = dobYear.value.padStart(4, '0');
        var m = dobMonth.value.padStart(2, '0');
        var d = dobDay.value.padStart(2, '0');
        return "".concat(y, "-").concat(m, "-").concat(d);
    }
    function setupEventListeners() {
        if (settingsToggle) {
            settingsToggle.addEventListener('click', function () {
                settingsPanel.classList.remove('hidden');
            });
        }
        if (closeSettings) {
            closeSettings.addEventListener('click', function () {
                settingsPanel.classList.add('hidden');
            });
        }
        if (settingsPanel) {
            settingsPanel.addEventListener('click', function (e) {
                if (e.target === settingsPanel) {
                    settingsPanel.classList.add('hidden');
                }
            });
        }
        var dobHandler = function () {
            settings.dob = getDobFromInputs();
            saveSettings();
        };
        if (dobYear)
            dobYear.addEventListener('input', function (e) {
                dobHandler();
                if (dobYear.value.length === 4 && dobMonth)
                    dobMonth.focus();
            });
        if (dobMonth)
            dobMonth.addEventListener('input', function (e) {
                dobHandler();
                if (dobMonth.value.length === 2 && dobDay)
                    dobDay.focus();
            });
        if (dobDay)
            dobDay.addEventListener('input', function (e) {
                dobHandler();
                if (dobDay.value.length === 2)
                    dobDay.blur();
            });
        if (lifeExpectancyInput)
            lifeExpectancyInput.addEventListener('change', function (e) {
                settings.lifeExpectancy = parseInt(e.target.value, 10) || 80;
                saveSettings();
            });
        if (sizeInput)
            sizeInput.addEventListener('input', function (e) {
                settings.size = parseInt(e.target.value, 10);
                saveSettings();
            });
        if (fontSizeInput)
            fontSizeInput.addEventListener('input', function (e) {
                settings.timerFontSize = parseFloat(e.target.value);
                saveSettings();
            });
        // Toggle Handlers
        var toggles = [
            { el: transparentTimerToggle, key: 'transparentTimer' },
            { el: boldTimerToggle, key: 'boldTimer' },
            { el: showAgeToggle, key: 'showAge' },
        ];
        toggles.forEach(function (_a) {
            var el = _a.el, key = _a.key;
            if (el) {
                el.addEventListener('click', function () {
                    var current = settings[key];
                    settings[key] = !current;
                    el.setAttribute('aria-checked', (!current).toString());
                    saveSettings();
                });
            }
        });
        // Segmented Handlers
        var setupSegmented = function (group, key) {
            if (!group)
                return;
            Array.from(group.children).forEach(function (btn) {
                if (btn instanceof HTMLButtonElement) {
                    btn.addEventListener('click', function () {
                        Array.from(group.children).forEach(function (b) { return b.classList.remove('active'); });
                        btn.classList.add('active');
                        settings[key] = (btn.getAttribute('data-value') || '');
                        if (key === 'subDayPrecision') {
                            updateVisibility();
                        }
                        saveSettings();
                    });
                }
            });
        };
        setupSegmented(shapeGroup, 'shape');
        setupSegmented(unitPrecisionGroup, 'unitPrecision');
        // The precision group is the one using subDayPrecision in HTML
        var precisionGroup = document.getElementById('precision-group');
        setupSegmented(precisionGroup, 'subDayPrecision');
        var themeGroup = document.getElementById('theme-group');
        if (themeGroup) {
            var themeBtns_1 = themeGroup.querySelectorAll('.theme-btn');
            themeBtns_1.forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var newTheme = btn.getAttribute('data-theme') || 'dark';
                    if (settings.theme === newTheme)
                        return;
                    themeBtns_1.forEach(function (b) { return b.classList.remove('active'); });
                    btn.classList.add('active');
                    var tvLayer = document.getElementById('tv-transition-layer');
                    if (tvLayer) {
                        tvLayer.classList.remove('tv-animating-in', 'tv-animating-out');
                        void tvLayer.offsetWidth; // force reflow
                        tvLayer.classList.add('tv-animating-in');
                        setTimeout(function () {
                            settings.theme = newTheme;
                            saveSettings();
                            setTimeout(function () {
                                tvLayer.classList.replace('tv-animating-in', 'tv-animating-out');
                            }, 50);
                        }, 800);
                    }
                    else {
                        settings.theme = newTheme;
                        saveSettings();
                    }
                });
            });
        }
    }
    // --- Grid Mathematics ---
    function renderGrid() {
        if (!gridContainer || window.innerWidth < 10 || window.innerHeight < 10)
            return;
        gridContainer.innerHTML = '';
        var dob = new Date(settings.dob);
        if (isNaN(dob.getTime()))
            return;
        var now = new Date();
        var lifeExpectancyYears = settings.lifeExpectancy || 80;
        var multiplier = 52;
        if (settings.unitPrecision === 'months')
            multiplier = 12;
        if (settings.unitPrecision === 'years')
            multiplier = 1;
        var totalUnits = lifeExpectancyYears * multiplier;
        var padding = 40;
        var availableWidth = Math.max(100, window.innerWidth - padding);
        var availableHeight = Math.max(100, window.innerHeight - padding);
        var aspect = availableWidth / availableHeight;
        var bestCols = Math.ceil(Math.sqrt(totalUnits * aspect));
        var maxSquareSize = 0;
        var optimizedCols = bestCols;
        var start = Math.max(1, bestCols - 2);
        var end = bestCols + 2;
        for (var c = start; c <= end; c++) {
            var r = Math.ceil(totalUnits / c);
            var w = availableWidth / c;
            var h = availableHeight / r;
            var sz = Math.min(w, h);
            if (sz > maxSquareSize) {
                maxSquareSize = sz;
                optimizedCols = c;
            }
        }
        bestCols = optimizedCols;
        if (totalUnits > 40 && bestCols < 2)
            bestCols = Math.ceil(Math.sqrt(totalUnits));
        if (!isFinite(bestCols) || bestCols < 1)
            bestCols = 1;
        var finalRows = Math.ceil(totalUnits / bestCols);
        var finalSquareSize = Math.floor(Math.min(availableWidth / bestCols, availableHeight / finalRows));
        var dotScale = (settings.size || 80) / 100;
        document.documentElement.style.setProperty('--grid-cols', bestCols.toString());
        document.documentElement.style.setProperty('--grid-rows', finalRows.toString());
        document.documentElement.style.setProperty('--dot-scale', "".concat(dotScale * 100, "%"));
        document.documentElement.style.setProperty('--cell-size', "".concat(finalSquareSize, "px"));
        var unitsLived = 0;
        if (settings.unitPrecision === 'weeks') {
            var diffTime = now.getTime() - dob.getTime();
            unitsLived = diffTime > 0 ? Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7)) : 0;
        }
        else if (settings.unitPrecision === 'months') {
            unitsLived = (now.getFullYear() - dob.getFullYear()) * 12;
            unitsLived -= dob.getMonth();
            unitsLived += now.getMonth();
            if (now.getDate() < dob.getDate())
                unitsLived--;
        }
        else {
            unitsLived = now.getFullYear() - dob.getFullYear();
            var tempDate = new Date(dob);
            tempDate.setFullYear(now.getFullYear());
            if (now < tempDate)
                unitsLived--;
        }
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < totalUnits; i++) {
            var div = document.createElement('div');
            div.className = "life-unit ".concat(settings.shape === 'circle' ? 'circle' : '');
            if (i < unitsLived) {
                div.style.backgroundColor = 'var(--box-past-base)';
                div.style.opacity = '1';
            }
            else {
                div.style.backgroundColor = 'var(--box-future)';
                var remainingUnits = totalUnits - unitsLived;
                if (remainingUnits > 0 && i > unitsLived) {
                    var distance = i - unitsLived - 1;
                    var ratio = distance / remainingUnits;
                    // Fade from 100% opacity near present to 10% opacity in the far future
                    var easeOutRatio = Math.pow(1 - ratio, 1.2);
                    div.style.opacity = (0.1 + (0.9 * easeOutRatio)).toString();
                }
                else {
                    div.style.opacity = '1';
                }
            }
            if (i === unitsLived) {
                div.style.opacity = '1';
                div.classList.add('current-unit');
                activeNodeData.element = div;
                var start_1 = new Date(dob);
                var end_1 = new Date(dob);
                if (settings.unitPrecision === 'weeks') {
                    start_1.setTime(dob.getTime() + unitsLived * 7 * 24 * 60 * 60 * 1000);
                    end_1.setTime(start_1.getTime() + 7 * 24 * 60 * 60 * 1000);
                }
                else if (settings.unitPrecision === 'months') {
                    start_1.setMonth(dob.getMonth() + unitsLived);
                    end_1.setMonth(dob.getMonth() + unitsLived + 1);
                }
                else {
                    start_1.setFullYear(dob.getFullYear() + unitsLived);
                    end_1.setFullYear(dob.getFullYear() + unitsLived + 1);
                }
                activeNodeData.startMs = start_1.getTime();
                activeNodeData.endMs = end_1.getTime();
            }
            fragment.appendChild(div);
        }
        gridContainer.appendChild(fragment);
    }
    // --- Realtime Engine ---
    function startEngine() {
        updateVisibility();
        requestAnimationFrame(updateTimerLoop);
    }
    function updateVisibility() {
        var permanentUnits = ['years', 'months', 'days'];
        var maxWeight = unitWeights[settings.subDayPrecision || 'milliseconds'];
        precisionOptions.forEach(function (unit) {
            var el = document.getElementById(unit);
            if (!el)
                return;
            var container = el.parentElement;
            if (!container)
                return;
            var unitWeight = unitWeights[unit];
            if (permanentUnits.includes(unit) || unitWeight >= maxWeight) {
                container.style.display = 'flex';
            }
            else {
                container.style.display = 'none';
            }
        });
    }
    function updateTimerLoop(timestamp) {
        updateTimerLogic();
        animationFrameId = requestAnimationFrame(updateTimerLoop);
    }
    function updateTimerLogic() {
        var now = new Date();
        var dob = new Date(settings.dob);
        if (isNaN(dob.getTime()))
            return;
        var lifeExpectancyYears = settings.lifeExpectancy || 80;
        var diff;
        if (settings.showAge) {
            diff = now.getTime() - dob.getTime();
        }
        else {
            var deathDate = new Date(dob);
            deathDate.setFullYear(dob.getFullYear() + lifeExpectancyYears);
            diff = deathDate.getTime() - now.getTime();
        }
        if (diff < 0)
            diff = 0;
        var ms = Math.floor((diff % 1000) / 10);
        var seconds = Math.floor(diff / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);
        var months = 0;
        var years = 0;
        seconds %= 60;
        minutes %= 60;
        hours %= 24;
        if (days >= 365) {
            years = Math.floor(days / 365);
            days %= 365;
        }
        if (days >= 30) {
            months = Math.floor(days / 30);
            days %= 30;
        }
        updateUnit('years', years);
        updateUnit('months', months);
        updateUnit('days', days);
        updateUnit('hours', hours);
        updateUnit('minutes', minutes);
        updateUnit('seconds', seconds);
        updateUnit('milliseconds', ms);
        // Update the visual pie-chart fill
        if (activeNodeData.element) {
            var startMs = activeNodeData.startMs, endMs = activeNodeData.endMs, element = activeNodeData.element;
            if (endMs > startMs) {
                var progress = Math.max(0, Math.min(1, (now.getTime() - startMs) / (endMs - startMs)));
                element.style.setProperty('--fill-progress', "".concat((progress * 100).toFixed(2), "%"));
            }
        }
    }
    function updateUnit(id, value) {
        var el = document.getElementById(id);
        if (el && el.parentElement && el.parentElement.style.display !== 'none') {
            var strVal = value.toString().padStart(2, '0');
            // Only write to DOM if it changed to maximize performance
            if (el.innerText !== strVal) {
                el.innerText = strVal;
            }
        }
    }
    var observer = new ResizeObserver(function (entries) {
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
            var entry = entries_1[_i];
            if (entry.contentRect.width > 50 && entry.contentRect.height > 50) {
                requestAnimationFrame(function () { return renderGrid(); });
            }
        }
    });
    function init() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loadSettings()];
                    case 1:
                        _a.sent();
                        syncStateToUI();
                        setupEventListeners();
                        applyAppearance();
                        if (gridContainer)
                            observer.observe(gridContainer);
                        renderGrid();
                        startEngine();
                        return [2 /*return*/];
                }
            });
        });
    }
    init();
});
