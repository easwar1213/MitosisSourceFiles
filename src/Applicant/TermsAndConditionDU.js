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
import  TermsAndCondition from './TermsAndCondition';
import  TermsAndConditionES from './TermsAndConditionES';
import  TermsAndConditionGE from './TermsAndConditionGE';
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

class TermsAndConditionDU extends Component {
    constructor(props) {
		super(props);
		const maxDate = new Date();
		maxDate.setFullYear(maxDate.getFullYear());
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
		  <a href='/TermsAndCondition'><MenuItem value={ "TermsAndCondition"} primaryText=" TermsAndCondition" /></a>
          <a href='/TermsAndConditionCN'><MenuItem value={ "TermsAndCondition"} primaryText=" TermsAndConditionCN" /></a>
          <a href='/TermsAndConditionES'><MenuItem value={"TermsAndCondition"} primaryText=" TermsAndConditionES" /></a>
          <a href='/TermsAndConditionGE'><MenuItem value={ "TermsAndCondition"} primaryText=" TermsAndConditionGE" /></a>
          <a href='/TermsAndConditionKR'><MenuItem value={ "TermsAndCondition"} primaryText=" TermsAndConditionKR" /></a>
		  <a href='/TermsAndConditionNR'><MenuItem value={ "TermsAndCondition"} primaryText=" TermsAndConditionNR" /></a>
		  <a href='/TermsAndConditionPR'><MenuItem value={ "TermsAndCondition"} primaryText=" TermsAndConditionPR" /></a>
        </SelectField>	
		<div> 
               
        <Grid>
        <div className="TC-header">
				<h3> ALGEMENE VOORWAARDEN</h3>
				</div>
				</Grid>   
				<Grid>
                                
                    <div className="TC-content">
                    <p>Deze documenten bevatten de Algemene Voorwaarden waarin ons bedrijf internationaal pensioen onderzoek diensten aan u bidet. U kunt deze documenten lezen om te zien of er informatie is die verheldering vraagt. Deze zullen we graag toelichten. Deze Algemene Voorwaarden zullen van kracht blijven en zullen van toepassing zijn bij alle diensten die we nu of in de toekomst aan u bieden. Mochten onze Algemene Voorwaarden in de toekomst door ons bedrijf aangepast worden, zullen we u hiervan tevoren schriftelijk inlichten.</p>
                    <p>De Algemene Voorwaarden voor onze diensten naar u toe dienen alleen als overzicht, en niet als een volledige beschrijving.</p>

                    <ul>
                        <li>De overeenkomst is tussen Global Pension Assosciates LLC (&ldquo;GPA&rdquo;) en U (de &ldquo;Aanvrager&rdquo;).</li>
                        <li>GPA zal de Aanvrager assisteren bij het zoeken en vinden om aanvullende pensioenuitkering te verkrijgen uit een land en/of priv&eacute; pensioen aanbieders (&ldquo;Pensioen Aanbieders&rdquo;), gebaseerd op werk- en verblijfstijd van de Aanvrager die <u>niet</u> het thuisland van de Aanvrager is.</li>
                        <li>De Aanvrager verbindt zich met en vrijwaart KBR Inc, inclusief hun dochterondernemingen, aanverwante bedrijven en historische entiteiten van alle claims met betrekking tot ontvangen of niet ontvangen uitkeringen door de Aanvrager.</li>
                        <li>Indien GBA geen uitkeringen verkrijgt voor de Aanvrager, zullen er geen kosten zijn voor de Aanvrager.</li>
                        <li>GPA geeft geen garanties dat er uitkeringen kunnen of zullen worden verkregen voor de Aanvrager.</li>
                        <li>Indien GPA uitkeringen voor de Aanvrager verkrijgt, zal de aanvrager een eenmalige vergoeding betalen gelijk aan de eerste twee maanden van pensioenuitkering die de Aanvrager verkregen heeft. Betaling dient te geschieden binnen negentig (90) dagen na de eerste ontvangen uitkering.</li>
                        <li>GPA, KBR Inc, Pensioenleveranciers en hun agenten en werknemers zijn niet in staat en mogen geen fiscaal, juridisch of financieel advies geven aan de Aanvrager.</li>
                        <li>GPA is niet aansprakelijk voor de correctheid van informatie die de Aanvrager of de pensioenuitvoerders aanleveren.</li>
                    </ul>
                    <p>Ik heb de Algemene Voorwaarden gelezen, begrepen en ga ermee akkoord.</p>
                    <p>VOORNAAM&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ACHTERNAAM&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; DATUM</p>
                    <div className="TC-content1">
                        <h3>Global Pension Associates LLC &ndash; Algemene Voorwaarden</h3>
                    </div>
                    <p>Lees de volgende Algemene Voorwaarden voor het gebruikmaken van de diensten van Global Pension Associates LLC (&ldquo;GPA&rdquo;) en deze software (de &ldquo;Software&rdquo;). Door gebruik te maken van de software en de informatie en diensten beschikbaar d.m.v. de Software, gaat u met deze Algemene Voorwaarden akkoord en zijn deze ook bindend. Indien u het niet eens bent met deze Algemene Voorwaarden, gebruik de Software niet. GPA is eigenaar van de Software en behoudt zich het recht, om deze Algemene Voorwaarden naar eigen inzicht op welk moment dan ook aan te passen. Deze aanpassingen zijn meteen van kracht op moment dat ze uitgegeven worden. U dient periodiek deze Algemene Voorwaarden voor aanpassingen na te kijken. Indien u de Software gebruikt nadat we aanpassingen hebben gemaakt aan de Software, bent u gebonden aan deze aanpassingen.</p>
                    <p>Dit document met Algemene Voorwaarden is een aanvulling op alle andere overeenkomsten die u heeft met GPA, inclusief alle klanten of rekening overeenkomsten en alle andere overeenkomsten die het gebruik bepalen van producten, diensten, inhoud, tools en informatie beschikbaar op de Software.</p>

                    <p><b>Gebruik van de Software</b></p>
                    <p>De Software is alleen bestemd voor uw persoonlijk, niet-commercieel gebruik en demonstratie. U mag informatie van de Software op uw computer downloaden en een harde kopie uitprinten voor uw persoonlijke referentie, mits u ermee akkoord gaat om geen zaken te verwijderen zoals auteursrecht, handelsmerken of andere berichten die daarin vermeld worden.</p>
                    <p><b>Geen Aanbevelingen of Advies Aangeleverd</b></p>
                    <p>GPA zal de Aanvrager assisteren bij het zoeken en vinden om aanvullende pensioenuitkering te verkrijgen uit een land en/of priv&eacute; pensioen aanbieders (&ldquo;Pensioen Aanbieders&rdquo;), gebaseerd op werk- en verblijfstijd van de Aanvrager die <u>niet</u> het thuisland van de Aanvrager is. GPA geeft geen aanbevelingen of geen enkel investeeradvies.</p>

                    <p>GPA levert de Software alleen voor informatieve, educatieve en niet-commerci&euml;le doeleinden. Ook al kan GPA data, informatie of inhoud leveren die gerelateerd zijn aan internationale pensioendiensten, dient u deze niet als investeer-, financieel-, belasting-, juridisch- of ander advies te nemen.</p>
                    <p>De verantwoordelijkheid blijft bij u omtrent het beoordelen van de voordelen en de risico&rsquo;s die het gebruik van de data, informatie of inhoud van de Software met zich meebrengen, maar ook de informatie die door pensioenuitvoerders leveren bij het nemen van enig besluit gebaseerd op zulke data, informatie of inhoud. In ruil voor het gebruik van deze data, informatie en inhoud, gaat u akkoord dat u GPA, KBR Inc, de Pensioenuitvoerders of hun agenten, werknemers of ambtlieden niet aansprakelijk houdt voor eventuele vorderingen tot schadevergoedingen die een gevolg zijn van beslissingen gemaakt gebaseerd op de informatie die geleverd zijn door GPA of Pensioenuitvoerders, hun dochterondernemingen, aanverwante bedrijven en hun historische entiteiten.</p>
                    
                    <p>GPA geeft geen garanties en is niet aansprakelijk voor de juistheid van de geleverde informatie door de Aanvrager of Pensioenuitvoerders.</p>

                    <p><b>Kosten</b></p>
                    <p>GPA zal u alleen kosten in rekening brengen in het geval dat u pensioenuitkeringen gaat ontvangen. Indien GPA uitkeringen voor u heeft verkregen, gaat u hierbij akkoord met het betalen van een eenmalige vergoeding gelijk aan de eerste twee maanden van pensioenuitkering die de Aanvrager verkregen heeft. Betaling dient te geschieden binnen negentig (90) dagen na de eerste ontvangen uitkering.</p>
                    <p>&nbsp;</p>
                    <p><b>Uitsluitingen en Beperkingen van Aansprakelijkheid</b></p>
                    <p>U begrijpt en gaat ermee akkoord dat:</p>
                    <p>&nbsp;</p>
                    <p>U gaat de software gebruiken &ldquo;as is&rdquo; en &ldquo;zolang beschikbaar&rdquo;. Voor zover dit volgens de toepasselijke wetgeving is toegestaan, wijst GPA uitdrukkelijk alle garanties van elke aard dan ook af met betrekking tot de software en de producten of diensten die beschikbaar zijn op of via de software, expliciet of impliciet, inclusief maar niet beperkt tot de impliciete garanties van verkoopbaarheid, geschiktheid voor een bepaald doel en niet-overtreding. GPA geeft geen garantie dat:</p>
                    <ol>
                        <li>De software aan uw vereisten zal voldoen;</li>
                        <li>De software niet onderbroken zal worden, tijdig zal reageren, vrij zal zijn van virussen, fouten, worms, date bombs, tijd bombs of andere schadelijke componenten;</li>
                        <li>Het resultaat die verkregen wordt van het gebruik van de software juist of betrouwbaar zal zijn;</li>
                        <li>De kwaliteit van elk product, dienst, informatie of ander materiaal die gekocht of verkregen wordt door u via de Software zal voldoen aan uw verwachtingen;</li>
                        <li>Alle fouten van de software verbeterd zullen worden; en</li>
                        <li>De data en materialen die in de software voorgedragen of getoond worden juist, nauwkeurig of betrouwbaar zijn. Alle inhoud of gedownloade data of andere data verkregen door het gebruik van de software is voor uw eigen inzicht en risico. U zult alleen verantwoordelijk zijn voor alle schade aan uw computersystemen of verlies van data die het resultaat zijn van download van zulke informatie.</li>
                    </ol>
                    <p>U gaat ermee akkoord dat GPA, KBR Inc, of enig ander derde partij die u op of via de softwarediensten levert niet verantwoordelijk of aansprakelijk zal zijn voor geen enkele schade die voortvloeit uit diefstal, ongeautoriseerd toegang, systeemfouten, communicatiestoringen of andere gebeurtenissen buiten de macht valt van GPA of derde partijen.</p>
                    <p>Geen enkel advies of informatie, of het geschreven of verbaal zijn, of die GPA aan u gegeven heeft, van een GPA-werknemer of agent of via of van de software zal enige garantie geven die niet expliciet in deze Algemene Voorwaarden vermeld staan. GPA zal niet aansprakelijk zijn voor enig directe, indirecte, incidentele, speciale, bijkomende of typische schade, inclusief maar niet beperkt tot schade voor verlies van winst, opbrengsten, inkomsten, goodwill, gebruik, data of andere ongedefinieerde verliezen die het resultaat zijn van:</p>
                    <ol>
                        <li>Het gebruik of onvermogen om de software te gebruiken;</li>
                        <li>De kosten voor vervangende goederen en diensten voor aangeschafte of verkregen goederen, data, informatie of diensten of ontvangen berichten of transacties die in, via of van de software ingevuld waren;</li>
                        <li>De toegang tot of aanpassing van uw transmissies of informatie als gevolg van uw gedrag, passiviteit of nalatigheid;</li>
                        <li>Verklaringen of gedrag van een derde partij; of</li>
                        <li>Alle andere kwesties die verband houden met de software.</li>
                    </ol>
                    <p><b>Schadeloosstelling</b></p>
                    <p>U gaat ermee akkoord om GPA, KBR Inc., en alle andere Pensioenuitvoerders en hun dochterondernemingen en de ambtlieden, directeuren, werknemers en agenten te vrijwaren, verdedigen en schadeloos te stellen tegen alle vorderingen, aansprakelijkheden, schade, verliezen of kosten, inclusief kosten voor juridische representatie die voortvloeien uit alle manieren die uw toegang geven tot of bij het gebruik van deze software en/of uw ontvangst of weigering van uitkeringen.</p>
                    <p><b>Integratie en Scheidbaarheid</b></p>
                    <p>Indien enige bepaling van deze Algemene Voorwaarden onwettig, nietig of om enige reden onuitvoerbaar wordt geacht, dan wordt die bepaling als afgescheiden van deze Algemene Voorwaarden geacht en zal geen invloed hebben op de geldigheid en afdwingbaarheid van de overige bepalingen. Deze Algemene Voorwaarden vormen de gehele overeenkomst tussen GPA en de Aanvrager.</p>             
                    <p><b>Derde Partijen</b></p>
                    <p>De Aanvrager gaat ermee akkoord dat GPA via e-mail of gelijke elektronische communicatie met u kan communiceren, waarbij derde partij informatie inbegrepen kan worden die voor u interessant kan zijn. GPA zal uw informatie niet delen, inclusief uw naam, adres, telefoonnummer of e-mail met derde partijen, anders dan uw pensioenuitvoerders.</p>
                    <p><b>Toepasselijke wetgeving en Zittingsplaats</b></p>
                    <p>Tenzij anders vermeld, beheert en exploiteert deze software vanuit onze kantoren in de staat Utah, Verenigde Staten van Amerika. GPA beweert niet dat materialen in deze software geschikt of beschikbaar zijn voor gebruik in alle locaties. Indien u ervoor kiest om deze Software uit andere locaties te gebruiken, doet u dit op eigen initiatief bent u verantwoordelijk voor de naleving van alle toepasselijke lokale wetten, zoals hierboven uiteengezet. Door de Software te gebruiken, gaat u akkoord dat de wetten van de staat Utah, Verenigde Staten van Amerika van kracht zullen zijn op deze Algemene Voorwaarden en op eventuele geschillen van welke aard dan ook die kunnen ontstaan tussen u en GPA of zijn relaties. Indien u juridische stappen gaat ondernemen met betrekking tot deze Algemene Voorwaarden, gaat u ermee akkoord om een dergelijke maatregel alleen in de Derde Gerechtelijke Kring van de Staat Utah van de United States District Court voor het District Utah in te dienen en u gaat akkoord met de exclusieve persoonlijk jurisdictie van deze rechtbanken voor de doeleinden van dergelijke vordering.</p>
                    <p>&nbsp;</p>
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

export default TermsAndConditionDU;