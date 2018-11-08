import { Locale } from './constructor'

import { calendar } from './calendar'
import { longDateFormat } from './formats'
import { invalidDate } from './invalid'
import { ordinal } from './ordinal'
import { preParsePostFormat } from './pre-post-format'
import { relativeTime, pastFuture } from './relative'
import { set } from './set'

// Month
import {
  localeMonthsParse,
  localeMonths,
  localeMonthsShort,
  monthsRegex,
  monthsShortRegex
} from '../units/month'

// Week
import { localeWeek, localeFirstDayOfYear, localeFirstDayOfWeek } from '../units/week'

// Day of Week
import {
  localeWeekdaysParse,
  localeWeekdays,
  localeWeekdaysMin,
  localeWeekdaysShort,

  weekdaysRegex,
  weekdaysShortRegex,
  weekdaysMinRegex
} from '../units/day-of-week'

// Hours
import { localeIsPM, localeMeridiem } from '../units/hour'

var proto = Locale.prototype

proto.calendar = calendar
proto.longDateFormat = longDateFormat
proto.invalidDate = invalidDate
proto.ordinal = ordinal
proto.preparse = preParsePostFormat
proto.postformat = preParsePostFormat
proto.relativeTime = relativeTime
proto.pastFuture = pastFuture
proto.set = set

proto.months = localeMonths
proto.monthsShort = localeMonthsShort
proto.monthsParse = localeMonthsParse
proto.monthsRegex = monthsRegex
proto.monthsShortRegex = monthsShortRegex
proto.week = localeWeek
proto.firstDayOfYear = localeFirstDayOfYear
proto.firstDayOfWeek = localeFirstDayOfWeek

proto.weekdays = localeWeekdays
proto.weekdaysMin = localeWeekdaysMin
proto.weekdaysShort = localeWeekdaysShort
proto.weekdaysParse = localeWeekdaysParse

proto.weekdaysRegex = weekdaysRegex
proto.weekdaysShortRegex = weekdaysShortRegex
proto.weekdaysMinRegex = weekdaysMinRegex

proto.isPM = localeIsPM
proto.meridiem = localeMeridiem
