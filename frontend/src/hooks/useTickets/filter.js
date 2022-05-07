import { useState, useEffect } from "react";
import { getHoursCloseTicketsAuto } from "../../config";
import toastError from "../../errors/toastError";

import api from "../../services/api";

const SearchFull = ({
    dateIni,
    dateFin,
    userId,
    status,
    withUnreadMessages,
}) => {
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        setLoading(true);
        const delayDebounceFn = setTimeout(() => {
            const fetchTickets = async () => {
                try {
                    const { data } = await api.get("/tickets", {
                        params: {
                            dateIni,
                            dateFin,
                            userId,
                            status,
                            withUnreadMessages,

                        },
                    })
                    setTickets(data.tickets)





                    setHasMore(data.hasMore)
                    setCount(data.count)
                    setLoading(false)
                } catch (err) {
                    setLoading(false)
                    toastError(err)
                }
            }



            fetchTickets()
        }, 500)
        return () => clearTimeout(delayDebounceFn)
    }, [
        dateIni,
        dateFin,
        userId,
        status,

        withUnreadMessages,
    ])

    return { tickets, loading, hasMore, count };
};

export default SearchFull;