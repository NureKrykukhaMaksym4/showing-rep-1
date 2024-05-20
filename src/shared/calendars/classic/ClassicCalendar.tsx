import React, {memo, useEffect, useRef, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './classic-calendar.module.scss';

type ClassicCalendarProps = {
    children: any;
    setDate: (date: Date) => void;
    date: Date | null
}

const ClassicCalendar = memo(({
                                  children,
                                  setDate,
                                  date}: ClassicCalendarProps) => {
    const [openCalendar, setOpenCalendar] = useState(false);
    const [position, setPosition] = useState('bottom');
    const calendarWrapperRef = useRef<HTMLDivElement>(null);

    const convertDateFormat = (date: Date) => {
        const year = date.getFullYear();
        let month = (date.getMonth() + 1);
        let day = date.getDate();

        let formattedDay = day.toString();
        let formattedMonth = month.toString();

        if (day < 10) {
            formattedDay = '0' + day.toString();
        }

        if (month < 10) {
            formattedMonth = '0' + month;
        }

        return formattedDay + '.' + formattedMonth + '.' + year;
    }

    const definePosition = () => {
        const rects = calendarWrapperRef.current?.getClientRects()[0];
        if (!rects) {
            return;
        }
        if (rects.height + rects.y + 350 > window.innerHeight) {
            setPosition('top');
        } else {
            setPosition('bottom');
        }
    }

    return (
        <div className={styles.calendar__wrapper} ref={calendarWrapperRef}>
            <h4 className={styles.calendar__title}
                onClick={() => {
                    definePosition();
                    setOpenCalendar(!openCalendar);
                }}
            >
                {children} {date && convertDateFormat(date)}
            </h4>
            {openCalendar && <Calendar
                className={`${styles.calendar} ${position === 'bottom' ? styles.pos__bottom : styles.pos__top}`}
                allowPartialRange={false}
                onClickDay={(date) => {
                    setDate(date);
                    setOpenCalendar(false);
                }}
            />}
        </div>
    );
});

ClassicCalendar.displayName = 'ClassicCalendar';
export default ClassicCalendar;