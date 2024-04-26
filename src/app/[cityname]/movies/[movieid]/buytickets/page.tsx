"use client"
import React from 'react'
// import DatePicker from "react-horizontal-datepicker";
import DatePicker from "react-datepicker";
import './BuyTicketsPage.css'
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarCheck } from "react-icons/fa";
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation'

const BuyTicketsPage  = () => {
    const pathname = usePathname()
    const params = useParams()
    const [selectedDate, setSelectedDate] = React.useState<any>(new Date())
    const { movieid, cityname } = params
    const [movie, setMovie] = React.useState<any>(null)
    const [theatres, setTheatres] = React.useState<any>(null)
    // const [selectedDate, setSelectedDate] = React.useState<any>(null)
    console.log(movieid)

    const getMovie = React.useCallback(async () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/movie/movies/${movieid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    console.log(data)
                    setMovie(data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })

    }, [movieid]);

    const formatShowtime = (showtime:any) => {
        // Assuming showtime is a string in "HH:mm:ss" format
        const timeString = showtime; // "14:00:00" for example
        const [hours, minutes] = timeString.split(':');

        // Create a date object at the beginning of the current day
        const showDate = new Date();
        showDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);

        // Format the showDate to a 12-hour time with AM/PM
        const formattedShowtime = showDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

        return formattedShowtime; // Will return "2:00 PM" for example
    };

    const getTheatres = React.useCallback(async (formattedDate:any) => {
        let movieId = movieid
        let city = cityname
        let date = formattedDate

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/movie/screensbymovieschedule/${city}/${date}/${movieId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    console.log(data)
                    setTheatres(data.data)
                }
                else {
                    console.log(data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [cityname, movieid])

    React.useEffect(() => {
        getMovie()
    }, [getMovie])

    React.useEffect(() => {
        getTheatres(selectedDate)
    }, [selectedDate])

    const handleDateChange = (date:any) => {
        const formattedDate = formatDateForAPI(date);
        setSelectedDate(date); // Update the state
        getTheatres(formattedDate); // Fetch new theatres data
    };

    // Helper function to format date as required by your API
    const formatDateForAPI = (date:any) => {
        // format the date as 'YYYY-MM-DD'
        return [
          date.getFullYear(),
          String(date.getMonth() + 1).padStart(2, '0'),
          String(date.getDate()).padStart(2, '0'),
        ].join('-');
    };


    return (
        <>
            {
                movie &&
                <div className='buytickets'>
            <div className='s1'>
            <div className='head'>
              <h1>{movie.title} - {movie.language}</h1>
              <h3>{movie.genre.join(", ")}</h3>
              
            </div>
            <div className='datepicker-container'>
                <div className="datepicker-header">
                    <h1><FaCalendarCheck className="calendar-icon" />Pick a date:</h1>
                </div>
                <DatePicker
                selected={selectedDate}
                onChange={(date: Date) => setSelectedDate(date)}
                dateFormat="MMMM d, yyyy"
                className="datepicker"
                wrapperClassName="datepicker-wrapper"
                id="datepicker" // Relate the label to the input
            />
            </div>

          </div>

                    {
                        theatres && theatres.length > 0 &&
                        <div className='screens'>
                            {
                                theatres.map((screen:any, index:any) => {
                                    let screenid = screen._id
                                    return (
                                        <div className='screen' key={index}>
                                            <div>
                                                <h2>{screen.name}</h2>
                                                <h3>{screen.location}</h3>
                                                {screen.showtimes && screen.showtimes.map((showtime:any, showIndex:any) => (
                                        <div key={showIndex}>
                                            {formatShowtime(showtime)} {/* Call formatShowtime to display formatted time */}
                                        </div>
                                    ))}
                                            </div>

                                            <Link href={`${pathname}/${screenid}?date=${selectedDate}`} className='theme_btn1 linkstylenone'>Select</Link>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default BuyTicketsPage