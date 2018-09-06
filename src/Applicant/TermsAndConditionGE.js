import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import CompanyLogo from '../img/logo.png';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import  TermsAndConditionCN from './TermsAndConditionCN';
import  TermsAndConditionDU from './TermsAndConditionDU';
import  TermsAndCondition from './TermsAndCondition';
import  TermsAndConditionES from './TermsAndConditionES';
import  TermsAndConditionKR from './TermsAndConditionKR';
import  TermsAndConditionNR from './TermsAndConditionNR';
import  TermsAndConditionPR from './TermsAndConditionPR';
import SignaturePad from 'react-signature-pad';
import './style.css';

const styles = {
    block: {
      maxWidth: 250,
    },
    checkbox: {
      marginBottom: 16,
    },
  };
class TermsAndConditionGE extends Component {
  constructor(props) {
		super(props);
		const maxDate = new Date();
		maxDate.setFullYear(maxDate.getFullYear() );
		maxDate.setHours(0, 0, 0, 0);
		this.state = {
			ischecked:false,
				FirstName:'',
				LastName:'',
				maxDate: maxDate,
				Name:'',
				Signature:'',
				SignedBy: null,
				value:null
				

		};
	}
	handleFirstName(e){
		this.setState({ FirstName: e.target.value});
	}
	handleLastName(e){
		this.setState({ LastName: e.target.value});
	}
	handleChangeMaxDate = (event, date) => {
		this.setState({
			maxDate: date,
		});
	};
	handleName(e){
		this.setState({ Name: e.target.value});
	}
	handleSignature(e){
		this.setState({ Signature: e.target.value});
	}

	handleChangeTitle = (event, index, SignedBy) => this.setState({SignedBy});

	// handleChange = (event, date) => {
	//     this.setState({
	//         controlledDate: date,
	//     });
	// };  

	handleCheck(){
		if(this.state.ischecked==false||this.state.ischecked=='')
		{
			this.setState({
				ischecked: true
			});
		}
		else
		{
			this.setState({
				ischecked: false
			}); 

		}
	}
	
	canBeSubmitted() {
		const { FirstName, LastName,  Name, SignedBy,ischecked } = this.state;
		return (
				FirstName.length > 0 &&
				LastName.length > 0 &&  Name.length>0 &&  SignedBy!=null&& ischecked==true
		);
	}
    render(){
      const isEnabled= this.canBeSubmitted();
        return(
          <div className="TC-bg">
          <img className="TC-logo" src={CompanyLogo} width="130" height="53"  /> 				
         
          <SelectField className="TC_Select"
    floatingLabelText="Lanuages"
    value={this.state.value}
    onChange={this.handleChange}
  >
    <a href='TermsAndCondition'><MenuItem value={ "TermsAndCondition"} primaryText=" TermsAndCondition" /></a>
    <a href='./TermsAndConditionCN'><MenuItem value={ "TermsAndCondition"} primaryText=" TermsAndConditionCN" /></a>
    <a href='./TermsAndConditionES'><MenuItem value={ "TermsAndCondition"} primaryText=" TermsAndConditionES" /></a>
    <a href='./TermsAndConditionDU'><MenuItem value={ "TermsAndCondition"} primaryText=" TermsAndConditionDU" /></a>
    <a href='./TermsAndConditionKR'><MenuItem value={ "TermsAndCondition"} primaryText=" TermsAndConditionKR" /></a>
    <a href='./TermsAndConditionNR'><MenuItem value={ "TermsAndCondition"} primaryText=" TermsAndConditionNR" /></a>
    <a href='./TermsAndConditionPR'><MenuItem value={ "TermsAndCondition"} primaryText=" TermsAndConditionPR" /></a>
  </SelectField>
  <div>	
          <Grid>
          <div className="TC-header">
                        <h3> GESCHÃ„FTSBEDINGUNGEN</h3>
                    </div>              
                    <div className="TC-content">
                    <p>In diesen Dokumenten werden die Bedingungen festgelegt, unter denenunserermaIhnen Forschungsdienste im Bereich der Internationale Rente zur VerfÃ¼gung stellt. Sie sollten diese Dokumente durchlesen und falls es irgendwelche Fragen gibt, die aufgeklÃ¤rt werden mÃ¼ssen, wÃ¼rden wir Ihnen gerne im Einzelnen erklÃ¤ren. Diese Bedingungen bleiben in Kraft und gelten fÃ¼r alle GeschÃ¤ftsdienstleistungen, die Ihnen jetzt oder in Zukunft zur VerfÃ¼gung gestellt werden. Sollte unsere Firma irgendwelche von GeschÃ¤ftsbedingungen zu einem spÃ¤teren Zeitpunkt Ã¤ndern, teilen wir Ihnen im Voraus darÃ¼ber schriftlich mit.</p>
                    <p>Die als Ãœbersicht nur und nicht als vollstÃ¤ndige Beschreibung dargestellten GeschÃ¤ftsbedingungen von unseren Dienstleistungen fÃ¼r Sie beinhalten das Folgende:</p>
                    <ul>
                         <li>Der Vertrag zwischen Global Pension Associates LLC (â€žGPAâ€œ) und Ihnen (der â€žAnmelder/die Anmelderinâ€œ).</li>
                         <li>GPA steht dem Anmelder/der Anmelderin bei der Suche, Feststellung und Hilfeleistung in der Geltendmachung von zusÃ¤tzlichen Vorsorgeleistungen in den LÃ¤ndern und/oder von privaten RententrÃ¤gern (â€žRententrÃ¤gerâ€œ) auf der Grundlage der BeschÃ¤ftigungs- und Aufenthaltszeit des Anmelders/der Anmelderin auÃŸerhalb des Herkunftslandes des Anmelders/der Anmelderin bei.</li>
                         <li>Der Anmelder/die Anmelderin verpflichtet sich, KBR Inc. einschlieÃŸlich ihrer Tochtergesellschaften, verbundenen Unternehmen und historischen KÃ¶rperschaften von allen AnsprÃ¼chen in Bezug auf die von dem Anmelder/der Anmelderin bezogenen oder nichtbezogenen Vorsorgeleistungen freizustellen.</li> 
                         <li>Falls GPA keine Vorsorgeleistungen fÃ¼r den Anmelder/die Anmelderin geltend macht, wird von dem Anmelder/der Anmelderin keine GebÃ¼hr oder Abgabe erhoben.</li>
                         <li>GPA Ã¼bernimmt keine Garantien oder Zusicherungen, dass die Vorsorgeleistungen fÃ¼r den Anmelder/die Anmelderin gewÃ¤hrt werden kÃ¶nnen oder gewÃ¤hrt werden.</li>
                         <li>Falls GPA fÃ¼r den Anmelder/die Anmelderin Vorsorgeleistungen geltend macht, zahlt der Anmelder/die Anmelderin eine einmalige GebÃ¼hr in HÃ¶he von den Rentenleistungen, die von dem Anmelder/der Anmelderin wÃ¤hrend zwei erster Monate bezogen werden. Die Zahlung ist innerhalb von neunzig (90) Tagen nach dem Erhalt der ersten Vorsorgeleistungen fÃ¤llig.</li>
                         <li>GPA, KBR Inc., RententrÃ¤ger und ihre Beauftragten und Mitarbeiter sind nicht in der Lage und werden dem Anmelder/der Anmelderin keine Steuer-, Rechts- oder Finanzberatung zu leisten.</li>
                         <li>GPA haftet nicht fÃ¼r die Richtigkeit der von dem Anmelder/der Anmelderin oder dem RententrÃ¤ger aufgefÃ¼hrten Angaben.</li> 
                    </ul> 
                    <p>â–¡Â  Ich habe die nachfolgenden GeschÃ¤ftsbedingungen gelesen, verstanden und bin damit einverstanden.</p> 
                    <p>VORNAME                    FAMILIENNAME                         DATUM</p> 
                   <div className="TC-content1">
                    <h3>Global Pension Associates LLC -- GESCHÃ„FTSBEDINGUNGEN</h3>
                   </div>
                    <p>Bitte lesen Sie die folgenden GeschÃ¤ftsbedingungen fÃ¼r die Benutzung der Dienstleistungen von Global Pension Associates LLC (â€žGPAâ€œ) und dieser Software (â€žSoftwareâ€œ). Durch die Benutzung der Software, der Information und der durch die Software verfÃ¼gbaren Dienstleistungen erklÃ¤ren Sie sich mit diesen GeschÃ¤ftsbedingungen vertraglich verpflichtet zu sein. Falls Sie mit diesen GeschÃ¤ftsbedingungen nicht einverstanden sind, verwenden Sie die Software nicht. GPA besitzt die Software und behÃ¤lt sich das Recht vor, diese GeschÃ¤ftsbedingungen jederzeit nach eigenem Ermessen zu Ã¤ndern und eine solche Ã„nderung wird sofort nach Bekanntgabe der Ã„nderung wirksam. Sie sollten diese GeschÃ¤ftsbedingungen regelmÃ¤ÃŸig auf Ã„nderungen Ã¼berprÃ¼fen. Falls Sie die Software benutzen, nachdem wir Ã„nderungen an der Software vorgenommen haben, werden Sie von solchen Ã„nderungen vertraglich verpflichtet.</p> 
                   <p>Diese GeschÃ¤ftsbedingungen sind ein Nachtrag zu allen anderen VertrÃ¤gen zwischen Ihnen und GPA, einschlieÃŸlich aller Kunden- oder Kontovereinbarungen und sonstiger Vereinbarungen, die Ihre Benutzung von Produkten, Dienstleistungen, Inhalten, Werkzeugen und Informationen der Software regeln.</p>
                   <p><b>Verwendung der Software</b></p>
                   <p>Die Software ist nur fÃ¼r Ihre persÃ¶nliche, nicht kommerzielle Benutzung und Wiedergabe bestimmt. Sie kÃ¶nnen Information von der Software auf Ihren Computer herunterladen und eine Kopie fÃ¼r Ihre persÃ¶nliche Referenz ausdrucken, vorausgesetzt, dass Sie damit einverstanden sind, keine Urheberrechts-, Marken- oder sonstigen Hinweise davon zu entfernen.</p>
                   <p><b>Keine Empfehlungen oder Beratung werden erbracht</b></p> 
                   <p>GPA steht den Anmeldern bei der Suche, Feststellung und Hilfeleistung in der Geltendmachung von zusÃ¤tzlichen internationalen Vorsorgeleistungen auf der Grundlage der Arbeit und BeschÃ¤ftigung des Anmelders/der Anmelderin auÃŸerhalb des Herkunftslandes des Anmelders/der Anmelderin bei. GPA gibt weder Empfehlungen noch bietet Anlageberatung jeglicher Art an.</p> 
                  <p>GPA stellt den Inhalt der Software nur fÃ¼r informative, aufklÃ¤rerische und nicht kommerzielle Zwecke zur VerfÃ¼gung. Obwohl GPA Daten, Information und Inhalt Ã¼ber internationale Versorgungsleistungen zur VerfÃ¼gung stellen kann, sollten Sie diese Information nicht als Investitions-, Finanz-, Steuer-, Rechts- oder sonstige Beratung auslegen. Sie allein tragen die vollstÃ¤ndige Verantwortung fÃ¼r die Auswertung von Vorteilen und Risiken, die mit der Benutzung von Daten, Information oder Inhalte der Software verbunden sind oder Ihnen von einem RententrÃ¤ger zur VerfÃ¼gung gestellt worden sind, bevor irgendwelche Entscheidungen auf der Grundlage dieser Daten, Information oder Inhalte getroffen werden. Im Austausch fÃ¼r die Benutzung dieser Daten, Information oder Inhalte erklÃ¤ren Sie sich damit einverstanden, dass Sie GPA, KBR Inc., die RententrÃ¤ger oder ihre BevollmÃ¤chtigten, Angestellten und Angestellten fÃ¼r jegliche SchadensersatzansprÃ¼che nicht haftbar machen werden, die sich aus einer Entscheidung ergeben, die auf der Grundlage von Information getroffen wurde, die Ihnen von GPA oder den RententrÃ¤gern, ihren Tochtergesellschaften, verbundenen Unternehmen und ihren historischen Einheiten zur VerfÃ¼gung gestellt wurde.</p>  <p>GPA haftet nicht fÃ¼r die Richtigkeit der von dem Anmelder/der Anmelderin oder dem RententrÃ¤ger aufgefÃ¼hrten Information.Â </p>
                  <p><b>GebÃ¼hren</b></p> 
                  <p>GPA erhebt nur eine GebÃ¼hr oder eine Anrechnung ist nur dann mÃ¶glich, wenn es die Rentenleistungen geltend macht und Sie diese erhalten. Falls GPA fÃ¼r Sie Vorsorgeleistungen geltend macht, sind Sie damit einverstanden, eine einmalige GebÃ¼hr in HÃ¶he von den Rentenleistungen zu zahlen, die Sie wÃ¤hrend zwei erster Monate beziehen werden. Die Zahlung ist innerhalb von neunzig (90) Tagen nach dem Erhalt der ersten Vorsorgeleistungen fÃ¤llig.</p> 
                  <p><b>Haftungsausschluss und HaftungsbeschrÃ¤nkung</b></p>
                  <p>Sie verstehen und erklÃ¤ren sich damit einverstanden, dass:</p>  
                  <p>Sie benutzen die Software auf der Grundlage â€žohne MÃ¤ngelgewÃ¤hrâ€œ und â€žwie vorliegendâ€œ. Soweit dies nach den anwendbaren Gesetzen erlaubt ist, lehnt GPA ausdrÃ¼cklich alle GewÃ¤hrleistungen jeglicher Art in Bezug auf die Software und alle Produkte oder Dienstleistungen ab, die durch die Software verfÃ¼gbar sind, sei es explizit oder implizit, einschlieÃŸlich, aber nicht beschrÃ¤nkt auf die stillschweigende GewÃ¤hrleistung der MarktgÃ¤ngigkeit, eine entsprechende Gebrauchstauglichkeit und Nichtverletzung. GPA Ã¼bernimmt keine GewÃ¤hr fÃ¼r das Folgende:</p> 
                 <ol>
                      <li>Die Software wird Ihren Anforderungen entsprechen.</li>
                       <li>Die Software wird ununterbrochen, aktuell, sicher oder frei von Viren, Fehlern, WÃ¼rmern, Datumsbomben, Zeitbomben oder anderen schÃ¤dlichen Komponenten sein;</li> 
                       <li>Die Ergebnisse, die durch die Benutzung der Software erzielt werden kÃ¶nnen, sind korrekt oder zuverlÃ¤ssig;</li> 
                       <li>Die QualitÃ¤t aller Produkte, Dienstleistungen, Information oder sonstigen Materialien, die Sie durch die Software erworben oder erhalten haben, entspricht Ihren Erwartungen.</li> 
                       <li>MÃ¶gliche Fehler der Software werden behoben; und</li> 
                       <li>Die Daten und Materialien, die durch die Software prÃ¤sentiert oder angezeigt werden, sind korrekt, genau oder zuverlÃ¤ssig. Alle Inhalte oder Daten, die durch die Benutzung der Software heruntergeladen oder anderweitig erhalten wurden, erfolgt nach Ihrem Ermessen und eigenes Risiko. Sie sind allein fÃ¼r SchÃ¤den an Ihrem Computersystem oder Datenverlust verantwortlich, die sich vom Herunterladen von solchen Inhalten ergeben.</li>
                 </ol> 
                 <p>Sie erklÃ¤ren sich damit einverstanden, dass GPA, KBR Inc. oder eine Drittpartei, die fÃ¼r die Bereitstellung von Diensten durch die Software fÃ¼r Sie einsetzen, weder verantwortlich noch haftbar fÃ¼r SchÃ¤den sind, die durch Diebstahl, nicht autorisierten Zugriff, Systemausfall, Kommunikationsausfall oder andere Vorkommnisse auÃŸer der Kontrolle von GPA und dieser Drittpartei verursacht wurden.</p> 
                 <p>Weder Beratung noch Information, ob schriftlich oder mÃ¼ndlich, ob diese von GPA, von einem GPA-Mitarbeiter oder BevollmÃ¤chtigten oder durch die Software erhalten wird, bewirkt keinerlei Garantie, die nicht ausdrÃ¼cklich in diesen GeschÃ¤ftsbedingungen angefÃ¼hrt ist. GPA haftet nicht fÃ¼r direkte, indirekte, zufÃ¤llige, spezielle, resultierende oder vorbildliche SchÃ¤den, einschlieÃŸlich, aber nicht beschrÃ¤nkt auf Schadensersatz fÃ¼r Gewinn-, Einnahmen-, Ertragsausfall, Firmenwert-, Gebrauch-, Daten oder sonstige immaterielle Verluste, die sich aus Folgenden ergeben:</p>
                <ol> 
                    <li>Die Benutzung oder die UnfÃ¤higkeit, die Software zu benutzen;</li> 
                    <li>Die Kosten fÃ¼r die Beschaffung von Ersatzteilen und Dienstleistungen, die sich Ã¼ber oder durch die Software aus Waren, Daten, Information oder Dienstleistungen, erworbener Software oder eingegangenen Mitteilungen oder abgeschlossenen Transaktionen ergeben;</li>
                    <li>Zugriff zu oder Ã„nderung Ihrer Ãœbertragung oder Daten aufgrund Ihres Verhaltens, Ihrer UntÃ¤tigkeit oder FahrlÃ¤ssigkeit;</li>
                    <li>ErklÃ¤rungen oder Verhalten einer Drittpartei; oder</li>
                    <li>Sonstige Angelegenheit in Bezug auf die Software.<br /> </li>
                </ol>
                 <p><b>EntschÃ¤digung</b></p>
                  <p>Sie erklÃ¤ren sich damit einverstanden, GPA, KBR Inc. und alle mÃ¶glichen RententrÃ¤ger und ihre verbundenen Tochtergesellschaften sowie die Beamten, Direktoren, Angestellten und Beauftragten gegen alle AnsprÃ¼che, Verbindlichkeiten, SchÃ¤den, Verluste oder Aufwendungen einschlieÃŸlich der GebÃ¼hren und Kosten der AnwÃ¤lte zu schÃ¼tzen und entschÃ¤digen, die sich daraus ergeben oder in irgendeiner Weise mit Ihrem Zugriff oder Benutzung dieser Software und/oder Ihrem Erhalt oder Verweigerung von Vorsorgeleistungen verbunden sind.</p> <p><b>Integration und Salvatorische Klausel</b></p> 
                  <p>Sollte eine Bestimmung dieser GeschÃ¤ftsbedingungen als rechtswidrig, ungÃ¼ltig oder aus irgendeinem Grund undurchfÃ¼hrbar angesehen werden, so gilt diese Bestimmung als trennbar von den vorliegenden GeschÃ¤ftsbedingungen und wird die GÃ¼ltigkeit und Wirksamkeit der Ã¼brigen Bestimmungen nicht berÃ¼hren. Diese GeschÃ¤ftsbedingungen stellen den gesamten Vertrag zwischen GPA und dem Anmelder/der Anmelderin dar.</p> 
                   <p><b>Drittparteien</b></p> 
                   <p>Der Anmelder/die Anmelderin erklÃ¤rt sich damit einverstanden, dass GPA sich mit Ihnen per E-Mail oder einer Ã¤hnlichen elektronischen Kommunikation in Verbindung setzen kann, die dabei die Information von der Drittpartei enthalten kann, die fÃ¼r Sie von Interesse sein kÃ¶nnte. GPA wird Ihre Information, einschlieÃŸlich Ihrer Namen, Adresse, Telefonnummer oder E-Mail, mit einer Drittpartei und unter Ausschluss Ihrer Pensionsplanverwalter nicht weitergeben.</p>
                   <p><b>Anwendbares Recht und Gerichtsstand</b></p>
                   <p>Sofern nicht anders bestimmt, kontrolliert und betreibt GPA diese Software von unseren BÃ¼ros im Bundesstaat Utah, Vereinigte Staaten von Amerika. Â GPA behauptet nicht, dass Materialien in dieser Software fÃ¼r alle Ortschaften geeignet oder verfÃ¼gbar sind. Wenn Sie sich entscheiden, diese Software von anderen Ortschaften zu benutzen, tun Sie dies auf eigene Initiative und Sie sind fÃ¼r die Einhaltung der oben dargelegten geltenden lokalen Gesetze verantwortlich. Bei der Ã–ffnung dieser Software erklÃ¤ren Sie, dass Sie sich mit den Gesetzen des Bundesstaates Utah, Vereinigte Staaten von Amerika einverstanden, ohne RÃ¼cksicht auf die GrundsÃ¤tze des Kollisionsrechts, die diese GeschÃ¤ftsbedingungen und allmÃ¶gliche Streitigkeiten jeglicher Art zwischen Ihnen und GPA oder seiner Tochtergesellschaften regeln. Falls Sie zu rechtlichen MaÃŸnahmen in Bezug auf diese GeschÃ¤ftsbedingungen greifen, erklÃ¤ren Sie sich damit einverstanden, sich damit nur an den Dritten Gerichtsbezirk des Bundesstaates Utah oder ans Amtsgericht der Vereinigten Staaten fÃ¼r den Bezirk Utah zu wenden, und Sie stimmen zu, Gerichtsbarkeit dieser Gerichte fÃ¼r die Zwecke der Rechtsstreitigkeiten anzuerkennen.</p> 
                        
				   <Grid>
				   <Row className="show-grid">
					   <Col xs={2} md={1}>
					   </Col>
					   <Col xs={12} md={10}>
						   <Col xs={12} md={12}>
							   <Col xs={12} md={4} className="input-fileds" >
								   <TextField className="CS-First" hintText="Enter your FirstName" floatingLabelText={<span>First Name<span className="manatoryfield">&nbsp;*</span></span>} value={this.state.FirstName} onChange={this.handleFirstName.bind(this)} />
							   </Col>
							   <Col xs={12} md={4} className="input-fileds" >
								   <TextField className="CS-Middle" hintText="Enter your MiddleName" floatingLabelText="Middle Name" />
							   </Col>
							   <Col xs={12} md={4} className="input-fileds" >
								   <TextField className="CS-Last" hintText="Enter your LastName" floatingLabelText={<span>Last Name<span className="manatoryfield">&nbsp;*</span></span>} value={this.state.LastName} onChange={this.handleLastName.bind(this)} />          
							   </Col>
						   </Col>
						   <Col xs={12} md={12}>
							   <Col xs={12} md={4} className="input-fileds" >
							   <DatePicker className="TC-datepicker" floatingLabelText={<span>Current Date<span className="manatoryfield">&nbsp;*</span></span>} 
								   onChange={this.handleChangeMaxDate}
								   disabled={true}
								   defaultDate={this.state.maxDate}
								   />
							   </Col>
							   <Col xs={12} md={4} className="input-fileds" >
							   <SelectField
									   className="reg-text"
									   value={this.state.SignedBy}
									   onChange={this.handleChangeTitle}
									   floatingLabelText={<span>SignedBy<span className="manatoryfield">&nbsp;*</span></span>} >
									   <MenuItem value={"Current Employee"}  primaryText="Current Employee" />
									   <MenuItem value={"Pervious Employee"} primaryText="Pervious Employee" />
									   <MenuItem value={"Spouse"} primaryText="Spouse" />                                                
								   </SelectField>
							   </Col>
							   <Col xs={12} md={4} className="input-fileds">
							   <TextField hintText="Enter your Your Name" floatingLabelText={<span>Name<span className="manatoryfield">&nbsp;*</span></span>}  value={this.state.Name} onChange={this.handleName.bind(this)}/>
							   </Col>
						   </Col>
						   <Col xs={12} md={12}>
							   <Col xs={12} md={4} className="TC-label" >
								   <label>Signature</label>
							   </Col>
							   <Col xs={12} md={4} className="input-fileds Sign" >
								   <SignaturePad  clearButton="true" />
							   </Col>
							   <Col xs={12} md={4}>
							   </Col>
						   </Col>
					   </Col>
				   </Row>
			   </Grid>

					</div>

					<div className="TC-Checkbox" >
					<Row>
					<Col xs={12} md={12}>
					<Col md={6} className="Checkalign">
					<Checkbox id="TCChk" label="I have read and agree to the Terms  and Conditions. "  value={this.state.ischecked}  onClick={this.handleCheck.bind(this)} style={styles.checkbox} />
					</Col>

					{/* <a href='/WelcomePage'> <RaisedButton  label="Continue" disabled={true} primary={true}  disabled={!this.state.code} /></a> */}
					<Col md={6} className="Checkalign1">
					<a href='/WelcomePage'> <Button className="TC-button" disabled={!isEnabled} >CONTINUE </Button></a>
					</Col>
					</Col>
					</Row>
					</div>
					</Grid>   
					</div>
                </div> 
        );
    }
}

export default TermsAndConditionGE;