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
import  TermsAndConditionGE from './TermsAndConditionGE';
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

class TermsAndConditionPR extends Component {
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
    <a href='/TermsAndConditionCN'><MenuItem value={ "TermsAndConditionCN"} primaryText=" TermsAndConditionCN" /></a>
    <a href='/TermsAndConditionES'><MenuItem value={ "TermsAndConditionES"} primaryText=" TermsAndConditionES" /></a>
    <a href='/TermsAndConditionDU'><MenuItem value={ "TermsAndConditionDU"} primaryText=" TermsAndConditionDU" /></a>
    <a href='/TermsAndConditionKR'><MenuItem value={ "TermsAndConditionKR"} primaryText=" TermsAndConditionKR" /></a>
    <a href='/TermsAndConditionNR'><MenuItem value={ "TermsAndConditionNR"} primaryText=" TermsAndConditionNR" /></a>
    <a href='/TermsAndConditionPR'><MenuItem value={ "TermsAndConditionPR"} primaryText=" TermsAndConditionPR" /></a>
  </SelectField>
  <div>	
          <Grid>
          <div className="TC-header">
                      <h3> TERMOS &amp; CONDIÇÕES</h3>
                    </div>
                     
                    
                    <div className="TC-content">
                    <p>
    Esses documentos introduzem os termos com os quais nossa empresa oferecerÃ¡
    serviÃ§os internacionais de pesquisa de pensÃµes para Vossa Senhoria. Deve
    ler os documentos e se por ventura existirem questÃµes as quais Vossa
    Senhoria requeira esclarecimento, teremos prazer em explicar em maiores
    detalhes. Esses termos permanecerÃ£o em vigÃªncia e serÃ£o aplicados a
    quaisquer serviÃ§os de negÃ³cios que lhe sejam oferecidos agora ou no futuro.
    No evento de nossa empresa mudar qualquer termos de negÃ³cio em uma data
    futura, avisaremos sobre as mudanÃ§as por escrito com antecedÃªncia.
</p>
<p>
    Somente para uma visÃ£o geral e nÃ£o como uma descriÃ§Ã£o completa, os Termos e
    CondiÃ§Ãµes de nossos serviÃ§os incluem:
</p>
<p>
    Â· O contrato Ã© entre Global Pension Associates LLC (â€œGPAâ€) e Vossa Senhoria
    (o â€œRequerenteâ€).
</p>
<p>
    Â· GPA oferecerÃ¡ assistÃªncia ao Requerente na busca, localizaÃ§Ã£o e na
    obtenÃ§Ã£o de benefÃ­cios adicionais de aposentadoria no paÃ­s ou provedor de
    pensÃ£o privada de aposentadoria (â€œProvedores de Aposentadoriaâ€) baseado no
    emprego e tempo de residÃªncia do Requerente <u>fora</u> do paÃ­s de origem
    do Requerente.
</p>
<p>
    Â· O Requerente concorda e deverÃ¡ indenizar KBR Inc., incluindo suas
    subsidiÃ¡rias, empresas relacionadas e entidades histÃ³ricas de quaisquer
    reivindicaÃ§Ãµes relacionadas aos benefÃ­cios recebidos ou nÃ£o recebidos pelo
    Requerente.
</p>
<p>
    Â· Se GPA nÃ£o obtiver quaisquer benefÃ­cios para o Requerente, nÃ£o haverÃ¡
    nenhuma cobranÃ§a ou taxa para o Requerente.
</p>
<p>
    Â· GPA nÃ£o oferece nenhuma garantia ou certeza de que tais benefÃ­cios
    poderÃ£o ou serÃ£o obtidos para o Requerente.
</p>
<p>
    Â· Se GPA obtiver benefÃ­cios para o Requerente, o Requerente pagarÃ¡ uma taxa
    Ãºnica igual aos primeiros dois meses dos benefÃ­cios de pensÃ£o recebidos
    pelo Requerente. O pagamento vence em noventa (90) dias apÃ³s o primeiro
    recebimento dos benefÃ­cios.
</p>
<p>
    Â· GPA, KBR Inc., Provedores de PensÃµes e seus agentes e empregados nÃ£o sÃ£o
    autorizados nem oferecerÃ£o consultoria sobre impostos, legal ou financeira
    para o Requerente.
</p>
<p>
    Â· GPA nÃ£o Ã© responsÃ¡vel pela veracidade da informaÃ§Ã£o oferecida pelo
    Requerente ou Provedores de PensÃ£o.
</p>
<p>
    â–¡ Eu li, compreendi e concordo com os Termos e CondiÃ§Ãµes que se seguem.
</p>
                        <div className="TC-content1">
                            <h3>Global Pension Associates LLC - Termos &amp; Condições</h3>
                        </div>
                        <p>
    Por favor leia os seguintes Termos e CondiÃ§Ãµes para uso dos serviÃ§os de
    Global Pension Associates LLC (â€œGPAâ€) e deste Software (the â€œSoftwareâ€). Ao
    usar o Software e a informaÃ§Ã£o e serviÃ§os disponÃ­veis no Software, Vossa
    Senhoria concorda em seguir e vincular-se a esses Termos e CondiÃ§Ãµes. Se
    Vossa Senhoria nÃ£o concordar com esses Termos e CondiÃ§Ãµes, nÃ£o use o
    Software. O Software Ã© de propriedade de GPA, que se reserva ao direito, a
    seu prÃ³prio critÃ©rio, de modificar os Termos e CondiÃ§Ãµes a qualquer momento
    e quaisquer modificaÃ§Ãµes terÃ£o efeito imediato apÃ³s serem inseridas. Os
    Termos e CondiÃ§Ãµes devem ser periodicamente revistos por Vossa Senhoria
    para verificar se houve mudanÃ§as. Se Vossa Senhoria usar o Software apÃ³s o
    implemento de modificaÃ§Ãµes no Software, Vossa Senhoria estarÃ¡ vinculado a
    essas mudanÃ§as.
</p>
<p>
    Os Termos e CondiÃ§Ãµes constituem-se como adicional a quaisquer outros
    acordos entre Vossa Senhoria e GPA, incluindo quaisquer acordos de cliente
    ou da conta e quaisquer outros acordos que regem o uso dos produtos,
    serviÃ§os, conteÃºdo, instrumentos e informaÃ§Ã£o disponÃ­veis no Software.
</p>
<p>
    <b>Uso do Software</b>
</p>
<p>
    O Software Ã© dirigido somente para seu uso pessoal, uso nÃ£o comercial e
    mostra. Vossa Senhoria pode baixar a informaÃ§Ã£o do Software para seu
    computador e imprimir cÃ³pia para sua referÃªncia pessoal, desde que concorde
    em nÃ£o retirar qualquer copyright, marca comercial ou outros avisos ali
    contidos.
</p>
<p>
    <b>NÃ£o Oferecemos RecomendaÃ§Ãµes ou Consultoria </b>
</p>
<p>
    GPA oferece assistÃªncia aos requerentes com busca, localizaÃ§Ã£o e
    assistÃªncia na obtenÃ§Ã£o de benefÃ­cios de aposentadoria internacional
    baseado no trabalho do requerente e emprego fora do paÃ­s de origem do
    requerente. GPA nÃ£o faz recomendaÃ§Ãµes ou oferece consultoria para
    investimentos de qualquer natureza.
</p>
<p>
    GPA oferece o conteÃºdo do Software somente para propÃ³sitos de informaÃ§Ã£o,
    educaÃ§Ã£o e nÃ£o comerciais. Embora GPA possa oferecer dados, informaÃ§Ã£o e
    conteÃºdo relacionados aos serviÃ§os internacionais de pensÃ£o, Vossa Senhoria
    nÃ£o deve interpretar tal informaÃ§Ã£o como sugestÃ£o de investimento,
    financeira, fiscal, legal ou outro tipo de sugestÃ£o. Somente Vossa Senhoria
    terÃ¡ a responsabilidade da avaliaÃ§Ã£o dos mÃ©ritos e riscos associados ao uso
    de qualquer dado, informaÃ§Ã£o ou conteÃºdo do Software ou que lhe for
    oferecido por qualquer Provedor de PensÃ£o, antes de tomar quaisquer
    decisÃµes baseadas nos dados, informaÃ§Ã£o ou conteÃºdo. Como troca do uso
    desses dados, informaÃ§Ã£o ou conteÃºdo, Vossa Senhoria concorda que nÃ£o
    impingirÃ¡ responsabilidade em GPA, KBR Inc., nos Provedores de PensÃ£o ou
    seus agentes, empregados e funcionÃ¡rios para reivindicaÃ§Ãµes por danos que
    venham a ocorrer devido a decisÃµes tomadas por Vossa Senhoria baseado em
    informaÃ§Ãµes disponibilizadas por GPA ou pelos Provedores de PensÃ£o, seus
    subsidiÃ¡rios, empresas relacionadas e suas entidades histÃ³ricas.
</p>
<p>
    GPA nÃ£o oferece garantias nem se responsabiliza pela precisÃ£o da informaÃ§Ã£o
    provida pelo Requerente ou Provedores de PensÃ£o.
</p>
<p>
    <b>Taxas</b>
</p>
<p>
    GPA somente cobrarÃ¡ de Vossa Senhoria uma taxa Ãºnica ou cobranÃ§a no caso
    que Vossa Senhoria venha a obter e receber benefÃ­cios de pensÃ£o. Se GPA
    obtiver os benefÃ­cios, Vossa Senhoria concorda, como determinado neste
    instrumento, em pagar uma taxa Ãºnica igual aos dois primeiros meses dos
    benefÃ­cios de pensÃ£o recebidos. O pagamento vence em noventa (90) dias a
    partir do primeiro recebimento dos benefÃ­cios.
</p>
<p>
    <b>RenÃºncias e LimitaÃ§Ãµes de Responsabilidade </b>
</p>
<p>
    Vossa Senhoria expressamente entende e concorda que:
</p>
<p>
    O uso do software Ã© oferecido â€œcomo estÃ¡â€ e â€œcomo disponÃ­velâ€. De acordo
    com a lei aplicÃ¡vel, a GPA renuncia expressamente a todas as garantias de
    qualquer tipo em relaÃ§Ã£o ao software e a quaisquer produtos ou serviÃ§os
    disponÃ­veis no ou atravÃ©s do software, seja de maneira expressa ou
    implÃ­cita, incluindo, mas sem limitar-se, garantias implÃ­citas de
    comercializaÃ§Ã£o, adequaÃ§Ã£o a um propÃ³sito especÃ­fico e nÃ£o infraÃ§Ã£o. GPA
    nÃ£o oferece garantia de que:
</p>
<p>
    1. O software atenderÃ¡ suas necessidades;
</p>
<p>
    2. O software serÃ¡ ininterrupto, oportuno, seguro ou livre de vÃ­rus, erros,
    worms, bombas de data, bombas de tempo ou outros componentes nocivos;
</p>
<p>
    3. Os resultados que venham a ser obtidos com uso do software serÃ£o
    precisos ou confiÃ¡veis;
</p>
<p>
    4. A qualidade de quaisquer produtos, serviÃ§os, informaÃ§Ã£o ou outro
    material adquirido ou obtido pelo software atenderÃ¡ suas expectativas;
</p>
<p>
    5. Quaisquer erros do software serÃ£o corrigidos; e
</p>
<p>
    6. Os dados e materiais apresentados ou mostrados no software sÃ£o corretos,
    precisos ou confiÃ¡veis. Qualquer conteÃºdo ou dado baixado ou de outra
    maneira obtido pelo uso do software Ã© feito por sua prÃ³pria escolha e
    risco. Vossa Senhoria serÃ¡ inteiramente responsÃ¡vel por qualquer dano em
    seu sistema de computador ou perda de dados que ocorram ao baixar qualquer
    conteÃºdo.
</p>
<p>
    Vossa Senhoria concorda que GPA, KBR Inc., ou qualquer terceiro envolvido
    na oferta de serviÃ§os a Vossa Senhoria pelo ou atravÃ©s do software, nÃ£o
    serÃ£o responsÃ¡veis por quaisquer danos causados por roubo, acesso nÃ£o
    autorizado, falha do sistema, falha na linha de comunicaÃ§Ã£o ou outras
    ocorrÃªncias alÃ©m do controle de GPA ou desses terceiros.
</p>
<p>
    Nenhuma sugestÃ£o ou informaÃ§Ã£o, quer escrita ou oral, mesmo tendo sido
    obtida por Vossa Senhoria de GPA, de um empregado de GPA ou agente atravÃ©s
    ou do software, constituir-se-Ã¡ em nenhuma garantia que nÃ£o haja sido
    expressamente afirmada nesses termos e condiÃ§Ãµes. GPA nÃ£o se
    responsabilizarÃ¡ por quaisquer danos diretos, indiretos, incidentais, danos
    ou perda de lucro, receita, ganhos, boa vontade, uso, dados ou outras
    perdas inatingÃ­veis que resultem de:
</p>
<p>
    1. Uso ou incapacidade de uso do software;
</p>
<p>
    2. Custo de aquisiÃ§Ã£o de bens substituÃ­dos e serviÃ§os que resultem de
    quaisquer bens, dados, informaÃ§Ã£o ou serviÃ§os adquiridos ou obtidos, ou
    mensagens recebidas, ou transaÃ§Ãµes realizadas, atravÃ©s do ou do prÃ³prio
    software.
</p>
<p>
    3. Acesso ou alteraÃ§Ã£o de suas transmissÃµes ou dados devido Ã  sua conduta,
    falta de aÃ§Ã£o ou negligÃªncia;
</p>
<p>
    4. AfirmaÃ§Ãµes ou conduta de terceiros; ou
</p>
<p>
    5. Qualquer outro assunto relacionado ao software.
    <br/>
    <br/>
</p>
<p>
    <b>IndenizaÃ§Ã£o </b>
</p>
<p>
    Vossa Senhoria concorda em indenizar, defender e isentar GPA, KBR Inc., e
    qualquer e todos os Provedores de PensÃ£o e seus afiliados e funcionÃ¡rios,
    diretores, empregados e agentes diante de quaisquer reivindicaÃ§Ãµes,
    responsabilidades, danos, perdas ou despesas, incluindo honorÃ¡rios
    advocatÃ­cios e custas, relacionado ou de qualquer maneira associado a seu
    acesso ou uso desse software e/ou seu recebimento ou negaÃ§Ã£o de benefÃ­cios.
</p>
<p>
    <b>IntegraÃ§Ã£o e Separabilidade</b>
</p>
<p>
    Se qualquer disposiÃ§Ã£o desses Termos e CondiÃ§Ãµes for considerada ilegal,
    nula ou por qualquer razÃ£o, inaplicÃ¡vel, tal provisÃ£o serÃ¡ considerada
    separÃ¡vel desses Termos e CondiÃ§Ãµes, o que nÃ£o afetarÃ¡ a validade e
    aplicabilidade das demais disposiÃ§Ãµes. Esses Termos e CondiÃ§Ãµes representam
    o completo acordo entre GPA e o requerente.
</p>
<p>
    <b>Terceiros</b>
</p>
<p>
    O Requerente concorda que GPA poderÃ¡ comunicar-se atravÃ©s de e-mail ou
    comunicaÃ§Ã£o eletrÃ´nica semelhante, que possa incluir informaÃ§Ã£o de
    terceiros que sejam de seu interesse. GPA nÃ£o compartilharÃ¡ sua informaÃ§Ã£o,
    incluindo nome, endereÃ§o, telefone ou e-mail com terceiros outros que nÃ£o
    sejam os administradores de seu plano de pensÃ£o.
</p>
<p>
    <b>Lei AplicÃ¡vel e Local</b>
</p>
<p>
    A nÃ£o ser que especificado de outra maneira, GPA controla e opera este
    Software das nossas instalaÃ§Ãµes no Estado de Utah, Estados Unidos da
    AmÃ©rica. GPA nÃ£o afirma que os materiais deste Software sÃ£o apropriados ou
    disponÃ­veis para uso em todos os locais. Se Vossa Senhoria escolher acessar
    este Software de outros locais, faÃ§a-o por iniciativa prÃ³pria,
    responsabilizando-se pelo cumprimento de quaisquer leis locais, conforme
    acima estabelecido. Ao acessar esse Software, Vossa Senhoria concorda que
    as leis do Estado de Utah, nos Estados Unidos da AmÃ©rica, sem considerar os
    princÃ­pios de conflitos de lei, regerÃ£o esses Termos e CondiÃ§Ãµes e
    quaisquer disputas de qualquer natureza que possam surgir entre Vossa
    Senhoria e GPA ou seus afiliados. Se Vossa Senhoria impetrar uma aÃ§Ã£o legal
    relacionada a esses Termos e CondiÃ§Ãµes, Vossa Senhoria concorda em dar
    entrada na aÃ§Ã£o somente no Terceiro Circuito Judicial do Estado de Utah ou
    na Corte Distrital dos Estados Unidos para o Distrito de Utah, e Vossa
    Senhoria consente e submete-se Ã  jurisdiÃ§Ã£o exclusiva e pessoal desses
    tribunais para o propÃ³sito de litÃ­gio de qualquer aÃ§Ã£o legal.
</p> <Grid>
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

export default TermsAndConditionPR;