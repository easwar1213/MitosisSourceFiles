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
class TermsAndConditionES extends Component {
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
				onChange={this.handleChange}>
				<a href='./TermsAndCondition'><MenuItem value={ "TermsAndCondition"} primaryText=" TermsAndCondition" /></a>
				<a href='./TermsAndConditionCN'><MenuItem value={" TermsAndConditionCN"} primaryText=" TermsAndConditionCN" /></a>
				<a href='./TermsAndConditionDU'><MenuItem value={"TermsAndConditionDU"} primaryText=" TermsAndConditionDU" /></a>
				<a href='./TermsAndConditionGE'><MenuItem value={ "TermsAndConditionGE"} primaryText=" TermsAndConditionGE" /></a>
				<a href='./TermsAndConditionKR'><MenuItem value={ "TermsAndConditionKR"} primaryText=" TermsAndConditionKR" /></a>
				<a href='./TermsAndConditionNR'><MenuItem value={ "TermsAndConditionNR"} primaryText=" TermsAndConditionNR" /></a>
				<a href='./TermsAndConditionPR'><MenuItem value={ "TermsAndConditionPR"} primaryText=" TermsAndConditionPR" /></a>
			</SelectField>	
            <Grid>
            <div className="TC-header">
                    
                        <h3 > TÉRMINOS &amp; CONDICIONES</h3>
                    </div>
                    <div className="TC-content">
                    <p>Estos documentos establecen los tÃ©rminos bajo los cuales nuestra firma le proporcionarÃ¡ servicios de investigaciÃ³n de pensiones internacionales. Usted deberÃ¡ leer estos documentos y, en caso de que exista alguna duda, con mucho gusto le ofreceremos una explicaciÃ³n mÃ¡s detallada. Estos tÃ©rminos se mantendrÃ¡n vigentes y se aplicarÃ¡n a todos los servicios empresariales que se le proporcionen ahora o en el futuro. En caso de que nuestra firma cambie cualquiera de sus condiciones empresariales en una fecha futura, le notificaremos por escrito los cambios con antelaciÃ³n.</p> 
                    <p>Los tÃ©rminos y condiciones de nuestros servicios incluyen, en forma de resumen y no de una descripciÃ³n completa y detallada, lo siguiente:</p>
                     <ul>
                          <li>El Acuerdo se concierta entre Global Pension Associates LLC (Â«GPAÂ») y usted (el Â«SolicitanteÂ»).</li>
                           <li>GPA ayudarÃ¡ al Solicitante en la bÃºsqueda, ubicaciÃ³n y asistencia para obtener beneficios de jubilaciÃ³n adicionales de parte de proveedores de pensiones nacionales y/o privados (Â«Proveedores de pensionesÂ») con base en el tiempo de empleo y residencia del Solicitante <b>fuera de</b> su paÃ­s de origen.</li>
                            <li>El Solicitante acepta y deberÃ¡ indemnizar a KBR Inc, incluyendo sus filiales, empresas vinculadas y entidades histÃ³ricas, por todas las reclamaciones relacionadas con los beneficios recibidos o no por el Solicitante.</li> 
                            <li>Si GPA no obtiene beneficios para el Solicitante, no se cobrarÃ¡ ningÃºn cargo u honorario al Solicitante.</li> 
                            <li>GPA no ofrece garantÃ­as o seguridades de que se podrÃ¡n obtener o se obtendrÃ¡n beneficios para el Solicitante.</li> 
                            <li>Si GPA obtiene beneficios para el Solicitante, el Solicitante pagarÃ¡ una cuota Ãºnica, igual a los dos primeros meses de beneficios de pensiÃ³n recibidos por el Solicitante. El pago deberÃ¡ realizarse dentro de los noventa (90) dÃ­as luego de haber recibido los primeros beneficios.</li> 
                            <li>GPA, KBR Inc., los Proveedores de pensiones, y sus agentes y empleados, no ofrecen asesoramiento fiscal, legal o financiero al Solicitante.</li> 
                            <li>GPA no es responsable de la exactitud de la informaciÃ³n proporcionada por el Solicitante o los Proveedores de pensiones.</li> 
                    </ul> 
                    <p>â–¡ He leÃ­do, entiendo y estoy de acuerdo con los siguientes TÃ©rminos y condiciones.</p>
                    <p>NOMBRE             APELLIDO                   FECHA </p>
                        <div className="TC-content1">
                            <h3>Global Pension Associates LLC, TÃ©rminos y condiciones</h3>
                        </div>
                        <p>Lea los siguientes TÃ©rminos y condiciones para utilizar los servicios de Global Pension Associates LLC (Â«GPAÂ») y este Software (el Â«SoftwareÂ»). Al usar el Software, la informaciÃ³n y servicios disponibles a travÃ©s del Software, usted acepta seguir y estar sujeto a estos TÃ©rminos y condiciones. Si no estÃ¡ de acuerdo con estos TÃ©rminos y condiciones, no utilice el Software. GPA es la propietaria del Software y se reserva el derecho, a su discreciÃ³n, de modificar estos TÃ©rminos y condiciones en cualquier momento, y cualquier modificaciÃ³n serÃ¡ efectiva inmediatamente despuÃ©s de su publicaciÃ³n. DeberÃ¡ revisar estos TÃ©rminos y condiciones periÃ³dicamente para informarse sobre las modificaciones. Si utiliza el Software despuÃ©s de publicadas las modificaciones, estarÃ¡ sujeto a dichas modificaciones.</p> 
                        <p>Estos TÃ©rminos y condiciones son adicionales a cualquier otro acuerdo entre usted y GPA, incluyendo cualquier acuerdo de cliente o de cuenta y cualquier otro acuerdo que rija su uso de los productos, servicios, contenido, herramientas e informaciÃ³n disponibles en el Software.</p>
                        <p><b>Uso del Software</b></p>
                        <p>El Software estÃ¡ diseÃ±ado Ãºnicamente para su uso y visualizaciÃ³n personal y no comercial. Usted podrÃ¡ descargar informaciÃ³n del Software a su computadora e imprimir una copia fÃ­sica para su referencia personal, siempre y cuando acepte no eliminar ningÃºn derecho de autor, marca registrada u otros avisos contenidos en el mismo.</p> 
                        <p><b>No se ofrecen recomendaciones o asesoramiento</b></p> 
                        <p>GPA ayuda a los solicitantes en la bÃºsqueda, ubicaciÃ³n y asistencia para obtener beneficios internacionales adicionales de jubilaciÃ³n con base en el trabajo y el empleo del solicitante fuera de su paÃ­s de origen. GPA no ofrece recomendaciones o asesoramiento en inversiÃ³n de ningÃºn tipo.</p>
                        <p>GPA proporciona el contenido del Software Ãºnicamente con fines informativos, educativos y no comerciales. Aunque GPA puede proporcionar datos, informaciÃ³n y contenido relacionado con los servicios de pensiones internacionales, no deberÃ¡ interpretar tal informaciÃ³n como asesoramiento financiero, fiscal, legal o de otra Ã­ndole. Usted serÃ¡ el Ãºnico responsable de evaluar las ventajas y riesgos asociados con el uso de cualquier tipo de informaciÃ³n, contenido o datos en el Software, o proporcionados a usted por cualquier Proveedor de pensiones antes de tomar decisiones basadas en tales datos, informaciÃ³n o contenido. A cambio de utilizar dichos datos, informaciÃ³n o contenido, usted acepta no responsabilizar a GPA, KBR Inc., los Proveedores de pensiones, o sus agentes, empleados y funcionarios, de cualquier posible reclamo por daÃ±os y perjuicios derivados de cualquier decisiÃ³n que usted tome con base en la informaciÃ³n puesta a su disposiciÃ³n por GPA o los Proveedores de pensiones, sus subsidiarias, compaÃ±Ã­as relacionadas y entidades histÃ³ricas.</p>
                        <p>GPA no ofrece garantÃ­as con respecto a, y no es responsable de la exactitud de la informaciÃ³n proporcionada por el Solicitante o los Proveedores de pensiones.</p>                   
                        <p><b>Tarifas</b></p> 
                        <p>GPA solo le cobrarÃ¡ una tarifa o cargo en el caso de que obtenga, y usted reciba, beneficios de pensiÃ³n.Â  Si GPA obtiene beneficios para usted, por medio de la presente usted acepta pagar una tarifa Ãºnica igual a los dos primeros meses de beneficios de pensiÃ³n que reciba. El pago deberÃ¡ realizarse dentro de los noventa (90) dÃ­as luego de haber recibido los primeros beneficios.</p>
                        <p><b>ExenciÃ³n y limitaciones de responsabilidad</b></p>
                        <p>Usted entiende y acepta de manera expresa que:</p>
                        <p>su uso del software se proporciona Â«tal como estÃ¡Â» y Â«segÃºn su disponibilidadÂ». En la medida de lo permitido por la ley aplicable, GPA renuncia expresamente a todas las garantÃ­as de cualquier tipo con respecto al software y cualquier producto o servicio disponible en o a travÃ©s del software, ya sea expreso o implÃ­cito, incluyendo, pero no limitado a las garantÃ­as implÃ­citas de comercializaciÃ³n, idoneidad para un propÃ³sito particular y de no infracciÃ³n. GPA no garantiza que:</p> 
                        <ol> 
                            <li>el software cumplirÃ¡ con sus requisitos;</li>
                            <li>el software serÃ¡ ininterrumpido, oportuno, seguro o libre de virus, errores, gusanos informÃ¡ticos, bombas de tiempo u otros componentes daÃ±inos;</li> 
                            <li>los resultados que puedan obtenerse del uso del software sean precisos o confiables;</li>
                            <li>la calidad de cualquier producto, servicio, informaciÃ³n u otro material comprado o adquirido por usted a travÃ©s del software cumplirÃ¡ con sus expectativas;</li>
                            <li>cualquier error en el software serÃ¡ corregido; y</li> 
                            <li>los datos y materiales presentados o mostrados en el software sean correctos, precisos o fiables. Cualquier descarga, u otro tipo de obtenciÃ³n de contenido o datos mediante el uso del software se realizan a su propia discreciÃ³n y riesgo. Usted serÃ¡ el Ãºnico responsable de cualquier daÃ±o a su sistema informÃ¡tico o pÃ©rdida de datos que resulten de la descarga de dicho contenido.</li>
                       </ol> 
                       <p>Usted acepta que GPA, KBR Inc., o cualquier tercero que preste sus servicios a travÃ©s del software, no serÃ¡ responsable de ningÃºn daÃ±o causado por robo, acceso no autorizado, fallos de sistemas, fallas en las lÃ­neas de comunicaciÃ³n u otros eventos fuera del control de GPA o de terceros.</p>
                       <p>Ninguna sugerencia o informaciÃ³n, ya sea escrita u oral, que usted haya obtenido de parte de GPA, un empleado o agente de GPA, o a travÃ©s del software, generarÃ¡ garantÃ­a alguna que no sea expresamente establecida en estos tÃ©rminos y condiciones. GPA no serÃ¡ responsable de ningÃºn daÃ±o directo, indirecto, incidental, especial, consecuente o ejemplar, incluyendo, pero no limitado a, daÃ±os por pÃ©rdida de beneficios, ingresos, ganancias, crÃ©dito mercantil, uso, datos u otras pÃ©rdidas intangibles, que resulten de:</p>
                       <ol> 
                           <li>el uso o la imposibilidad de usar el software;</li>
                           <li>el costo de la adquisiciÃ³n de bienes y servicios sustitutivos provenientes de cualquier mercancÃ­a, datos, informaciÃ³n o servicios adquiridos u obtenidos, o mensajes recibidos o transacciones realizadas a travÃ©s del software;</li>
                           <li>el acceso o alteraciÃ³n de sus transmisiones o datos debido a su conducta, inacciÃ³n o negligencia;</li>
                           <li>declaraciones o conducta de cualquier tercero; o</li>
                           <li>cualquier otro asunto relacionado con el Software.</li> 
                       </ol> 
                              <p><b>IndemnizaciÃ³n</b></p> 
                              <p>Usted acepta indemnizar, defender y eximir a GPA, KBR Inc., y a todos y cada uno de los Proveedores de pensiones y sus afiliados y a los funcionarios, directores, empleados y agentes de cualquier y todas las reclamaciones, responsabilidades, daÃ±os, pÃ©rdidas o gastos, incluyendo honorarios de abogados y costos, que surjan o estÃ©n relacionados de cualquier manera con su acceso o uso de este software y/o su recibo o denegaciÃ³n de beneficios.</p>
                              <p><b>IntegraciÃ³n y divisibilidad</b></p> 
                              <p>Si alguna disposiciÃ³n de estos TÃ©rminos y condiciones se considera ilegal, nula o por cualquier razÃ³n inaplicable, entonces dicha disposiciÃ³n serÃ¡ considerada como divisible de estos TÃ©rminos y condiciones y no afectarÃ¡ la validez y aplicabilidad de las disposiciones restantes. Estos TÃ©rminos y condiciones representan el acuerdo completo entre GPA y el solicitante.</p> 
                              <p><b>TERCEROS</b></p>
                              <p>El Solicitante acepta que GPA podrÃ¡ comunicarse a travÃ©s de correo electrÃ³nico o cualquier comunicaciÃ³n electrÃ³nica similar, que puede incluir informaciÃ³n de terceros, de interÃ©s para usted. GPA no compartirÃ¡ su informaciÃ³n, incluyendo su nombre, direcciÃ³n, nÃºmero de telÃ©fono o correo electrÃ³nico, con terceros, que no sean sus administradores de planes de pensiones.</p>
                              <p><b>Ley pertinente y jurisdicciÃ³n</b></p> 
                              <p>A menos que se especifique lo contrario, GPA controla y opera este Software desde las oficinas en el estado de Utah, en los Estados Unidos de AmÃ©rica. GPA no asegura que los materiales de este Software sean apropiados o estÃ©n disponibles para su uso en todas las ubicaciones. Si decide acceder a este Software desde otras ubicaciones, lo hace por iniciativa propia y es responsable de cumplir con las leyes locales aplicables, segÃºn lo establecido anteriormente. Al usar este Software, usted acepta que las leyes del estado de Utah, en los Estados Unidos de AmÃ©rica, sin tener en cuenta los principios de conflicto de leyes, regirÃ¡n estos TÃ©rminos y condiciones y cualquier disputa de cualquier tipo que pudiera surgir entre usted y GPA o sus afiliados. En caso de emprender alguna acciÃ³n legal relacionada con estos TÃ©rminos y condiciones, usted acepta presentar tal reclamaciÃ³n solamente en el Tercer Circuito Judicial del estado de Utah o el Tribunal de Primera Instancia de los Estados Unidos para el distrito de Utah, y usted consiente y se somete al personal jurisdiccional exclusivo de esos tribunales con el fin de litigar cualquier acciÃ³n de este tipo.</p>
                             <p> </p>
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
                
                
        );
    }
}

export default TermsAndConditionES;