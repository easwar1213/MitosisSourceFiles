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
import  TermsAndConditionGE from './TermsAndConditionGE';
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

class TermsAndConditionNR extends Component {
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
      <a href='/TermsAndConditionCN'><MenuItem value={ "TermsAndCondition"} primaryText=" TermsAndConditionCN" /></a>
      <a href='/TermsAndConditionES'><MenuItem value={ "TermsAndCondition"} primaryText=" TermsAndConditionES" /></a>
      <a href='/TermsAndConditionDU'><MenuItem value={ "TermsAndCondition"} primaryText=" TermsAndConditionDU" /></a>
      <a href='/TermsAndConditionKR'><MenuItem value={ "TermsAndCondition"} primaryText=" TermsAndConditionKR" /></a>
      <a href='/TermsAndConditionGE'><MenuItem value={ "TermsAndCondition"} primaryText=" TermsAndConditionGE" /></a>
      <a href='/TermsAndConditionPR'><MenuItem value={ "TermsAndCondition"} primaryText=" TermsAndConditionPR" /></a>
    </SelectField>	
    <div>
            <Grid>
            <div className="TC-header">
                <h3 > VILKÃ…R OG BETINGELSER</h3>
            </div>
                     
                    
                    <div className="TC-content">
                    <p>
                        Disse dokumentene fastsetter vilkÃ¥rene for hvordan firmaet vÃ¥rt vil levere
                        pensjonsytelser til deg. Du bÃ¸r lese gjennom disse dokumentene og dersom
                        det er forhold du trenger avklaring pÃ¥, vil vi gjerne forklare disse
                        nÃ¦rmere. Disse vilkÃ¥rene vil gjelde og skal gjelde for eventuelle
                        forretningstjenester som leveres til deg nÃ¥, eller i fremtiden. Skulle
                        firmaet endre noen av sine forretningsvilkÃ¥r pÃ¥ et senere tidspunkt, vil vi
                        letsle deg skriftlig i forkant av endringene.
                    </p>
                    <p>
                        Oversikten under er et kortfattet sammendrag over hva som omfattes av vÃ¥re
                        vilkÃ¥r og betingelser i leveransen av vÃ¥re tjenester til deg:
                    </p>
                    <p>
                        Â· Avtalen er mellom Global Pension Associates LLC (â€œGPAâ€) og Deg
                        (â€œSÃ¸kerenâ€).
                    </p>
                    <p>
                        Â· GPA vil bistÃ¥ sÃ¸keren med Ã¥ sÃ¸ke, lokalisere og assistere sÃ¸keren med Ã¥
                        fÃ¥ ytterligere pensjonsytelser fra landets og/eller private
                        pensjonstilbydere (â€œPensjonstilbydere â€) basert pÃ¥ sÃ¸kerens sysselsetting
                        og bostedtid utenfor sÃ¸keres hjemland.
                    </p>
                    <p>
                        Â· SÃ¸keren samtykker til og skal holde KBR Inc. og dets datterselskaper,
                        felleskontrollerte selskap og historiske enheter skadeslÃ¸se fra alle krav
                        knyttet til ytelser mottatt eller ikke mottatt av sÃ¸keren.
                    </p>
                    <p>
                        Â· Hvis GPA ikke klarer Ã¥ oppnÃ¥ ytterligere pensjonsytelser for sÃ¸keren vil
                        sÃ¸keren ikke belastes en kostnad eller et gebyr for tjenesten.
                    </p>
                    <p>
                        Â· GPA hverken lover eller garanterer at pensjonsytelser vil etableres for
                        sÃ¸keren.
                    </p>
                    <p>
                        Â· Hvis GPA fÃ¥r fastslÃ¥tt ytelser berettiget sÃ¸keren, vil sÃ¸keren betale et
                        engangsgebyr tilsletende pensjonsytelser mottatt av sÃ¸keren de fÃ¸rste to
                        mÃ¥nedene. Betaling forfaller innen nitti (90) dager etter den fÃ¸rste
                        pensjonsutbetalingen er mottatt.
                    </p>
                    <p>
                        Â· GPA, KBR Inc., pensjonstilbydere og deres agenter og ansatte skal ikke
                        tilby skattemessige, juridiske eller Ã¸konomiske rÃ¥d til sÃ¸keren.
                    </p>
                    <p>
                        Â· GPA skal ikke holdes ansletlig for nÃ¸yaktigheten av informasjonen oppgitt
                        av sÃ¸keren eller pensjonstilbyderen.
                    </p>
                    <p>
                        â–¡ Jeg har lest, forstÃ¥r og samtykker til vilkÃ¥r og betingelser under.
                    </p>
                    <p>
                        FORNAVN ETTERNAVN DATO
                    </p>
                    <div className="TC-content1">
                            <h3> Global Pension Associates LLC â€“ VilkÃ¥r og betingelser</h3>
                    </div>
                    <p>
                        Vennligst les fÃ¸lgende vilkÃ¥r og betingelser for bruk av tjenestene til
                        Global Pension Associates LLC ("GPA") og denne programleten
                        ("Programleten"). Ved Ã¥ bruke programleten og den informasjon og tjenester
                        som gjÃ¸res tilgjengelig gjennom programleten, godtar du Ã¥ fÃ¸lge og vÃ¦re
                        bundet av disse vilkÃ¥rene. Hvis du ikke godtar disse vilkÃ¥rene, mÃ¥ du ikke
                        bruke programleten. GPA eier programleten og forbeholder seg retten til,
                        etter eget skjÃ¸nn, Ã¥ endre disse vilkÃ¥rene nÃ¥r som helst, og enhver slik
                        endring vil tre i kraft umiddelbart etter letsel om endring. Du bÃ¸r sjekke
                        disse vilkÃ¥rene jevnlig for endringer. Hvis du bruker programleten etter at
                        vi har gjort endringer i programleten, vil du vÃ¦re bundet av disse
                        endringene.
                    </p>
                    <p>
                        Disse vilkÃ¥rene kommer i tillegg til eventuelle andre avtaler mellom deg og
                        GPA, inkludert enhver kunde- eller kontoavtaler og andre avtaler som
                        regulerer bruken av produkter, tjenester, innhold, verktÃ¸y og informasjon
                        som er tilgjengelig pÃ¥ Programleten.
                    </p>
                    <p>
                        <u>Bruken av Programleten</u>
                    </p>
                    <p>
                        Programleten er kun ment for personlig, ikke-kommersiell bruk og visning.
                        Du kan laste ned informasjon fra Programleten til datamaskinen og skrive ut
                        en papirkopi for personlig referanse, forutsatt at du samtykker til Ã¥ ikke
                        fjerne opphavsrett, letemerker eller andre merknader som finnes deri.
                    </p>
                    <p>
                        <u>Ingen anbefaling eller rÃ¥d er gitt</u>
                    </p>
                    <p>
                        GPA bistÃ¥r sÃ¸kere med sÃ¸king, lokalisere og assistere sÃ¸kere til Ã¥ fÃ¥ flere
                        internasjonale pensjonsytelser basert pÃ¥ sÃ¸kerens arbeid og sysselsetting
                        utenfor sÃ¸kerens hjemland. GPA gir ikke anbefalinger og tilbyr ikke
                        investeringsrÃ¥d av noe slag.
                    </p>
                    <p>
                        GPA tilbyr innholdet av Programleten kun for informasjon, pedagogiske og
                        ikke-kommersielle formÃ¥l. Selv om GPA kan gjÃ¸re tilgjengelig data,
                        informasjon og innhold knyttet til internasjonale pensjonstjenester, bÃ¸r du
                        ikke tolke slike opplysninger som investeringsrÃ¥d, Ã¸konomiske,
                        skattemessige, juridiske eller andre rÃ¥d. Du alene vil bÃ¦re ansletet for Ã¥
                        vurdere fordelene og risikoen forbundet med bruk av data, informasjon eller
                        innhold i Programleten eller gitt til deg av eventuelle
                        pensjonsleverandÃ¸rer fÃ¸r du tar noen beslutninger basert pÃ¥ slike data,
                        informasjon eller innhold. For Ã¥ bruke slik data, informasjon eller
                        innhold, samtykker du til ikke Ã¥ holde GPA, KBR Inc., pensjonstilbydere
                        eller deres agenter, ansatte og ledere ansletlige for eventuelle krav om
                        erstatning som fÃ¸lge av beslutninger som gjÃ¸res basert pÃ¥ informasjon som
                        er gjort tilgjengelig for deg av GPA eller pensjonstilbydere, deres
                        datterselskaper, tilknyttede selskaper og deres historiske enheter.
                    </p>
                    <p>
                        GPA gir ingen garantier for, og er ikke ansletlig for nÃ¸yaktigheten av
                        informasjonen som gis av sÃ¸keren eller pensjonstilbydere.
                    </p>
                    <p>
                        <u>Gebyrer</u>
                    </p>
                    <p>
                        GPA skal kun kreve en avgift eller gebyr i tilfelle at du fÃ¥r tildelt og du
                        mottar pensjonsytelser. Hvis GPA fÃ¥r innhentet fordeler for deg, samtykker
                        du herved til Ã¥ betale et engangsgebyr lik de to fÃ¸rste mÃ¥nedene av
                        pensjonsytelser mottatt av deg. Betaling skjer innen nitti (90) dager etter
                        de fÃ¸rste ytelsene er mottatt.
                    </p>
                    <p>
                        <u>Ansletsfraskrivelser og ansletsbegrensning</u>
                    </p>
                    <p>
                        Du forstÃ¥r og samtykker uttrykkelig til at:
                    </p>
                    <p>
                        Din bruk av programleten leveres "som den er" og pÃ¥ en "som tilgjengelig"
                        basis. I den grad tillatt etter gjeldende lov, fraskriver GPA seg alle
                        garantier av noe slag med hensyn til Programleten og eventuelle produkter
                        eller tjenester tilgjengelig pÃ¥ eller gjennom Programleten, uttrykkelig
                        eller underforstÃ¥tt, inkludert, men ikke begrenset til, implisitte
                        garantier om salgbarhet, egnethet for et bestemt formÃ¥l og ikke-krenkelse.
                        GPA gir ingen garanti for at:
                    </p>
                    <p>
                        1. Programleten vil oppfylle dine krav;
                    </p>
                    <p>
                        2. Programleten vil kjÃ¸re uforstyrret, tidsriktig, sikker, fritt for virus,
                        feil, ormer, datobomber, tidsbomber, eller andre skadelige komponenter;
                    </p>
                    <p>
                        3. Resultatene som innhentes fra bruken av Programleten vil vÃ¦re nÃ¸yaktige
                        eller pÃ¥litelige;
                    </p>
                    <p>
                        4. Kvaliteten pÃ¥ produktene, tjenestene, informasjonen, eller annet
                        materiell kjÃ¸pt eller mottatt av deg vil vÃ¦re i samslet med dine
                        forventninger;
                    </p>
                    <p>
                        5. Eventuelle feil i Programleten vil korrigeres; og
                    </p>
                    <p>
                        6. Data og materiell presenter teller vis pÃ¥ Programleten er riktig,
                        nÃ¸yaktig og pÃ¥litelig. Ethvert innhold eller data nedlastet, eller pÃ¥ annen
                        mÃ¥te mottatt som fÃ¸lge av bruken av Programleten gjÃ¸res etter eget skjÃ¸nn
                        og pÃ¥ egen risiko. Du vil alene vÃ¦re ansletlig for eventuell skade pÃ¥ din
                        datamaskin eller tap av data som oppstÃ¥r fra nedlasting av slikt innhold.
                    </p>
                    <p>
                        Du samtykker til at GPA, KBR Inc., eller eventuell tredjepart som er
                        engasjert for Ã¥ levere tjenester til deg, ikke skal holdes ansletlig for
                        skader forÃ¥rsaket av tyveri, uautorisert tilgang, systemsvikt, svikt i
                        kommunikasjonskanal, eller andre hendelser som er utover GPAs eller slike
                        tredjeparters kontroll.
                    </p>
                    <p>
                        Ingen rÃ¥d eller informasjon, enten skriftlig eller muntlig, enten innhentet
                        fra GPA, en GPA ansatt eller agent, eller gjennom eller fra Programleten,
                        skal utgjÃ¸re noen garanti som ikke uttrykkelig er angitt i disse vilkÃ¥rene.
                        GPA skal ikke vÃ¦re ansletlig for noen direkte, indirekte, spesielle,
                        fÃ¸lgeskader eller fÃ¸lgeskade, inkludert men ikke begrenset til, skader for
                        tap av fortjeneste, inntekter, omsetning, goodwill, bruk, data eller andre
                        immaterielle tap, som fÃ¸lge av:
                    </p>
                    <p>
                        1. Bruken eller manglende evne til Ã¥ bruke Programleten;
                    </p>
                    <p>
                        2. Kostnaden for innkjÃ¸p av leter og tjenester som fÃ¸lge av noen leter,
                        data, informasjon eller tjenester kjÃ¸pt eller innhentet, eller meldinger
                        mottatt eller transaksjoner inngÃ¥tt gjennom eller fra Programleten;
                    </p>
                    <p>
                        3. Tilgang til eller endring av dine overfÃ¸ringer eller data pÃ¥ grunn av
                        din atferd, manglende handling eller forsÃ¸mmelse;
                    </p>
                    <p>
                        4. Uttalelser eller atferd fra tredjeparter; eller
                    </p>
                    <p>
                        5. Andre saker knyttet til Programleten.
                        <br/>
                        <br/>
                    </p>
                    <p>
                        <u>SkadelÃ¸sholdelse</u>
                    </p>
                    <p>
                        Du godtar Ã¥ beskytte, forslete og holde GPA, KBR Inc., og enhver og alle
                        pensjonstilbydere og deres og deres samarbeidspartnere og ledere,
                        styremedlemmer, ansatte og agenter fra og mot alle krav, anslet, skader,
                        tap eller utgifter, inkludert advokathonorarer og kostnader, som fÃ¸lge av
                        eller som pÃ¥ noen mÃ¥te er knyttet til din tilgang til eller bruk av denne
                        Programleten og/eller mottak av eller avslag pÃ¥ ytelser.
                    </p>
                    <p>
                        <u>Tredjeparter</u>
                    </p>
                    <p>
                        SÃ¸keren aksepterer at GPA kan kommunisere med deg gjennom e-post eller
                        lignende elektronisk kommunikasjon, som kan omfatte tredjeparts informasjon
                        som kan vÃ¦re av interesse for deg. GPA vil ikke dele din informasjon,
                        inkludert navn, adresse, telefonnummer eller e-post, med tredjeparter,
                        annet enn administratorer av pensjonsordning.
                    </p>
                    <p>
                        <u>Integrasjon og ugyldighet</u>
                    </p>
                    <p>
                        Hvis noen bestemmelse i disse vilkÃ¥rene anses som ulovlige, ugyldige eller
                        av annen grunn ikke kan hÃ¥ndheves, skal denne bestemmelsen anses som
                        atskilt fra disse vilkÃ¥rene, og vil ikke pÃ¥virke gyldigheten og
                        hÃ¥ndhevelsen av de gjenvÃ¦rende bestemmelsene. Disse vilkÃ¥rene utgjÃ¸r hele
                        avtalen mellom GPA og sÃ¸keren.
                    </p>
                    <p>
                        <u>Gjeldende lov og verneting</u>
                    </p>
                    <p>
                        Med mindre annet er spesifisert, kontrollerer og driver GPA denne
                        Programleten fra vÃ¥re kontorer i delstaten Utah, USA. GPA hevder ikke at
                        materialer i denne Programleten er passende eller tilgjengelig for bruk
                        alle steder. Hvis du velger Ã¥ fÃ¥ tilgang til denne Programleten fra andre
                        steder, gjÃ¸r du det pÃ¥ eget initiativ, og du er ansletlig for Ã¥ fÃ¸lge
                        gjeldende lokale lover, som angitt ovenfor. Ved Ã¥ besÃ¸ke denne
                        Programleten, samtykker du i at lovene i delstaten Utah, USA, uten hensyn
                        til prinsipper om lovkonflikter, vil styre disse vilkÃ¥rene og eventuelle
                        tvister av noe slag som kan oppstÃ¥ mellom deg og GPA, eller dets partnere.
                        Hvis du tar rettslige skritt knyttet til disse vilkÃ¥rene, samtykker du til
                        kun Ã¥ sende inn slike tiltak til den tredje Judicial Circuit i staten Utah
                        eller United States District Court for District of Utah, og du samtykker
                        til og respekterer den eksklusive personlige jurisdiksjonen til disse
                        domstolene for eventuelle rettslige skritt.
                    </p>
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

export default TermsAndConditionNR;