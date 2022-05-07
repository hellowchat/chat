import React, { useContext } from "react"
import { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import SearchFull from "../../hooks/useTickets/filter"
import TextField from '@material-ui/core/TextField';
import { AuthContext } from "../../context/Auth/AuthContext";
import Select from '@material-ui/core/Select';
import { i18n } from "../../translate/i18n";
import MenuItem from '@material-ui/core/MenuItem';
import Chart from "./Chart"

const useStyles = makeStyles(theme => ({
	container: {

		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	fixedHeightPaper: {
		boxShadow: "none", //
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
		height: 240,
	},
	customFixedHeightPaper: {
		boxShadow: "none", //
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
		height: 120,
	},
	customFixedHeightPaperLg: {
		boxShadow: "none", //
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
		height: "100%",
	},
}))

const Dashboard = () => {

	const classes = useStyles()


	const { user } = useContext(AuthContext);




	const [userId, setUserId] = useState(0);
	const [dateIni, setDateIni] = useState('');
	const [dateFin, setDateFin] = useState('');



	const [openTickets, setOpenTickets] = useState([]);
	const [pendingTickets, setPendingTickets] = useState([]);
	const [closedTickets, setClosedTickets] = useState([]);


	const SearchTickets = (userId, dateIni, dateFin, status) => {

		//passar datainicial
		//passar datafinal
		//passar atendente

		const { tickets } = SearchFull({
			userId: userId,
			dateIni: dateIni,
			dateFin: dateFin,
			status: status
		});
		return tickets;
	}
	const buttonSearchByUserId = () => {
/* 
		const ticketsOpen = this.SearchTickets(userId, dateIni, dateFin, 'open');

		const ticketsPending = this.SearchTickets(userId, dateIni, dateFin, 'pending');
		const ticketsClosed = this.SearchTickets(userId, dateIni, dateFin, 'closed');

		
		setOpenTickets([ticketsOpen])
		pendingTickets([ticketsPending])
		closedTickets([ticketsClosed]) */
		/* 	setOpenTickets(SearchTickets(userId, dateIni, dateFin, 'open'))
			setPendingTickets(SearchTickets(userId, dateIni, dateFin, 'pending'))
			setClosedTickets(SearchTickets(userId, dateIni, dateFin, 'closed')) */
	}

	useEffect(()=> {
		
		/* const ticketsOpen = this.SearchTickets(userId, dateIni, dateFin, 'open');

		const ticketsPending = this.SearchTickets(userId, dateIni, dateFin, 'pending');
		const ticketsClosed = this.SearchTickets(userId, dateIni, dateFin, 'closed');
 */
		
		setOpenTickets([10])
		pendingTickets([40])
		closedTickets([100])
	}, []);

	return (
		<div>
			<Container maxWidth="lg" className={classes.container}>


				<form className={classes.container} noValidate>
					<Select
						value={userId}
						onChange={
							(e) => setUserId(e.target.value)}
						style={{ width: '150px', marginRight: '10px' }}

						name="searchUserId"
						className=""
					>
						<MenuItem value={0}>
							<em>All</em>
						</MenuItem>
						<MenuItem value={1}>Joao</MenuItem>
						<MenuItem value={2}>Mileide</MenuItem>
						<MenuItem value={3}>Luan</MenuItem>
					</Select>



					<TextField
						id="date"
						label="Data Inicial"
						type="date"
						defaultValue={dateIni}
						className={classes.textField}
						InputLabelProps={{
							shrink: true,
						}}
						onChange={(e) => setDateIni(e.target.value)}
					/>

					<TextField
						id="date"
						label="Data Final"
						type="date"
						defaultValue={dateFin}
						className={classes.textField}
						InputLabelProps={{
							shrink: true,
						}}
						onChange={(e) => setDateFin(e.target.value)}
					/>
					<Button variant="outlined" color="primary" className={classes.button} onClick={() => buttonSearchByUserId()}>
						Search
					</Button>

				</form>
				<Grid container spacing={3}>
					<Grid item xs={4}>
						<Paper className={classes.customFixedHeightPaper} style={{ overflow: "hidden" }}>
							<Typography component="h3" variant="h6" color="primary" paragraph>
								{i18n.t("dashboard.messages.inAttendance.title")}
							</Typography>
							<Grid item>
								<Typography component="h1" variant="h4">
									{openTickets}
								</Typography>
							</Grid>
						</Paper>
					</Grid>
					<Grid item xs={4}>
						<Paper className={classes.customFixedHeightPaper} style={{ overflow: "hidden" }}>
							<Typography component="h3" variant="h6" color="primary" paragraph>
								{i18n.t("dashboard.messages.waiting.title")}
							</Typography>
							<Grid item>
								<Typography component="h1" variant="h4">
									{pendingTickets}
								</Typography>
							</Grid>
						</Paper>
					</Grid>
					<Grid item xs={4}>
						<Paper className={classes.customFixedHeightPaper} style={{ overflow: "hidden" }}>
							<Typography component="h3" variant="h6" color="primary" paragraph>
								{i18n.t("dashboard.messages.closed.title")}
							</Typography>
							<Grid item>
								<Typography component="h1" variant="h4">
									{closedTickets}
								</Typography>
							</Grid>
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper className={classes.fixedHeightPaper}>
							<Chart />
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}

export default Dashboard