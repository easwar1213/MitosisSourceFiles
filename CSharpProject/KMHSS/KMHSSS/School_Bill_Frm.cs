using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Data.SqlClient;
using Microsoft.VisualBasic;
using CrystalDecisions.CrystalReports.Engine;

namespace KMHSSS
{
    public partial class School_Bill_Frm : Form
    {
        string query,query3, term,Bill_No;
        int last = 0;
        string Description = "SCHOOL BILL", namt, dnamt;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public School_Bill_Frm()
        {
            InitializeComponent();
        }

        private void School_Bill_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                fill_Class_CBox();
                fill_AYear_CBox();
                Auto_Num();
                Fill_Grid();
                SBill_Date_Dtp.Value = DateTime.Now;
                Term_Amt_Txt.Text = "0";
                SYear_CBox.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void fill_Class_CBox()
        {
            try
            {
                Class_CBox.Items.Clear();
                query = "select Class from Class_Master_Table";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Class_CBox.Items.Add(dr["Class"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void fill_Section_CBox()
        {
            try
            {
                Sec_CBox.Items.Clear();
                query = "select Section from Section_Master_Table where Class='" + Class_CBox.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Sec_CBox.Items.Add(dr["Section"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void fill_AYear_CBox()
        {
            try
            {
                SYear_CBox.Items.Clear();
                query = "select SYear from Academy_Year_Master_Table";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    SYear_CBox.Items.Add(dr["SYear"].ToString());
                }
                con.Close();
                last = SYear_CBox.Items.Count - 1;
                SYear_CBox.SelectedIndex = last;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Fill_Grid()
        {
            try
            {
                query = "select row_number() over(order by SBill_No) as SNo,* from School_Bill_Master_Table where Class='" + Class_CBox.Text + "' and Admission_No='" + Admis_No_Txt.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                School_Bill_Master_dataGridView1.DataSource = dt;
                School_Bill_Master_dataGridView1.Columns[0].HeaderText = "SNo";
                School_Bill_Master_dataGridView1.Columns[1].HeaderText = "Bill No";
                School_Bill_Master_dataGridView1.Columns[2].HeaderText = "Bill Date";
                School_Bill_Master_dataGridView1.Columns[3].HeaderText = "Class";
                School_Bill_Master_dataGridView1.Columns[4].HeaderText = "Section";
                School_Bill_Master_dataGridView1.Columns[5].HeaderText = "Student Name";
                School_Bill_Master_dataGridView1.Columns[6].HeaderText = "Admis No";
                School_Bill_Master_dataGridView1.Columns[7].HeaderText = "SYear";
                School_Bill_Master_dataGridView1.Columns[8].HeaderText = "EYear";
                School_Bill_Master_dataGridView1.Columns[9].HeaderText = "Term Type";
                School_Bill_Master_dataGridView1.Columns[10].HeaderText = "Term Amount";
                School_Bill_Master_dataGridView1.Columns[11].HeaderText = "Fine";
                School_Bill_Master_dataGridView1.Columns[12].HeaderText = "Total";
                School_Bill_Master_dataGridView1.Columns[0].Width = 120;
                School_Bill_Master_dataGridView1.Columns[1].Width = 120;
                School_Bill_Master_dataGridView1.Columns[2].Width = 120;
                School_Bill_Master_dataGridView1.Columns[3].Width = 120;
                School_Bill_Master_dataGridView1.Columns[4].Width = 120;
                School_Bill_Master_dataGridView1.Columns[5].Width = 330;
                School_Bill_Master_dataGridView1.Columns[6].Width = 150;
                School_Bill_Master_dataGridView1.Columns[7].Width = 150;
                School_Bill_Master_dataGridView1.Columns[8].Width = 150;
                School_Bill_Master_dataGridView1.Columns[9].Width = 150;
                School_Bill_Master_dataGridView1.Columns[10].Width = 150;
                School_Bill_Master_dataGridView1.Columns[11].Width = 150;
                School_Bill_Master_dataGridView1.Columns[12].Width = 150;            
                
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Auto_Num()
        {
            try
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("SELECT COUNT(SBill_No) as Tot FROM School_Bill_Master_Table", con);
                SqlDataReader dr;
                dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    int i = Convert.ToInt32(dr["tot"]);

                    if (i > 0)
                    {
                        int j = i + 117;
                        SBill_No_Txt.Text = "SB" + j.ToString();

                    }
                    else
                    {
                        SBill_No_Txt.Text = "SB1";
                    }

                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Amt_Clear()
        {
            Term_Amt_Txt.Text = "0";
            Fine_Txt.Text = "0";
        }

        public void Clear_Controls()
        {
            SBill_No_Txt.Text = "";
            SBill_Date_Dtp.Text = "";
            Class_CBox.Text = "";
            Student_Name_CBox.Text = "";
            Admis_No_Txt.Text = "";
            STerm_Txt.Text = "";
            Sec_CBox.Text = "";
            SYear_CBox.Text = "";
            EYear_Txt.Text = "";
            Terms_CBox.Text = "";
            Term_Amt_Txt.Text = "0";
            Fine_Txt.Text = "0";
            Total_Txt.Text = "";
            fill_AYear_CBox();
            SYear_CBox.Focus();
        }
       
        public void Net_Amount()
        {
            try
            {
                query3 = "select sum(Total) from Daily_Net_Amount_Master_Table where Bill_Date='" + SBill_Date_Dtp.Text.ToString().Trim() + "' and Description='" + Description.ToString().Trim() + "'";
                SqlCommand cmd3 = new SqlCommand(query3, con);
                con.Open();
                SqlDataReader dr = cmd3.ExecuteReader();
                while (dr.Read())
                {
                    namt = dr[0].ToString();
                }
                dr.Close();
                con.Close();
                query = "select * from Net_Amount_Table where Description='" + Description.ToString().Trim() + "' and Bill_Date='" + SBill_Date_Dtp.Text.ToString().Trim() + "'";
                SqlCommand cmd = new SqlCommand(query, con);
                con.Open();
                dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    dr.Close();
                    query = "update Net_Amount_Table set Total=" + namt + " where Bill_Date='" + SBill_Date_Dtp.Text.ToString().Trim() + "' and Description='" + Description.ToString().Trim() + "'";
                    cmd = new SqlCommand(query, con);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                else
                {
                    dr.Close();
                    query = "insert Net_Amount_Table values('" + Description.ToString().Trim() + "'," + namt + ",'" + SBill_Date_Dtp.Text.ToString().Trim() + "')";
                    cmd = new SqlCommand(query, con);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void DNet_Amount()
        {
            try
            {
                query3 = "select sum(Total) from Net_Amount_Table where Bill_Date='" + SBill_Date_Dtp.Text.ToString().Trim() + "'";
                SqlCommand cmd3 = new SqlCommand(query3, con);
                con.Open();
                SqlDataReader dr = cmd3.ExecuteReader();
                while (dr.Read())
                {
                    dnamt = dr[0].ToString();
                }
                dr.Close();
                con.Close();
                query = "Select * From Daily_Turn_Over_Table Where Bill_Date='" + SBill_Date_Dtp.Text.ToString().Trim() + "'";
                SqlCommand cmd = new SqlCommand(query, con);
                con.Open();
                dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    dr.Close();
                    query = "update Daily_Turn_Over_Table set Total='" + dnamt + "' where Bill_Date='" + SBill_Date_Dtp.Text.ToString().Trim() + "'";
                    cmd = new SqlCommand(query, con);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                else
                {
                    dr.Close();
                    query = "insert Daily_Turn_Over_Table values(" + dnamt + ",'" + SBill_Date_Dtp.Text.ToString().Trim() + "')";
                    cmd = new SqlCommand(query, con);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }    
                

        public void amt()
        {
            try
            {
                double amt = 0, fine = 0, tot = 0;
                if (Term_Amt_Txt.Text != "")
                {
                    amt = Convert.ToDouble(Term_Amt_Txt.Text);
                }

                if (Fine_Txt.Text != "")
                {
                    fine = Convert.ToDouble(Fine_Txt.Text);
                }

                tot = amt + fine;
                Total_Txt.Text = tot.ToString();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Class_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {            
            try
            {
                fill_Section_CBox();
                Fill_Std_Name();               
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }        
        }

        private void Sec_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            Fill_Std_Name();
        }

        private void Student_Name_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                query = "select Admission_No,STerm,ETerm,Bill_Type,Exemp_Term from Student_Admission_Master_Table where Std_Name='" + Student_Name_CBox.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Admis_No_Txt.Text = dr["Admission_No"].ToString();
                    STerm_Txt.Text = dr["STerm"].ToString();
                    ETerm_Txt.Text = dr["ETerm"].ToString();
                    Bill_Type_Txt.Text = dr["Bill_Type"].ToString();
                    Exemp_Term_Txt.Text = dr["Exemp_Term"].ToString();
                }
                dr.Close();
                con.Close();
                Fill_Grid();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Terms_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                int c = 0;
                query = "Select * From School_Bill_Master_Table Where Class='" + Class_CBox.Text.ToString().Trim() + "' and Std_Name='" + Student_Name_CBox.Text.ToString().Trim() + "' and Admission_No='" + Admis_No_Txt.Text.ToString().Trim() + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                SqlCommand cmd = new SqlCommand(query, con);
                con.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    term = dr[8].ToString();
                    c++;
                }
                if (Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM3")
                {
                    if (c == 0 && Terms_CBox.Text == "TERM1")
                    {
                        MessageBox.Show("Plz Pay", "Alert");
                        dr.Close();
                        con.Close();
                        Fees();
                    }
                    else if (c == 1 && Terms_CBox.Text == "TERM2")
                    {
                        MessageBox.Show("Plz Pay", "Alert");
                        dr.Close();
                        con.Close();
                        Fees();
                    }
                    else if (Terms_CBox.Text == "TERM3 is Exempted")
                    {
                        MessageBox.Show("This Term is Exempted", "Alert");
                        dr.Close();
                        con.Close();
                        Term_Amt_Txt.Text = "";
                        Total_Txt.Text = "";
                    }
                    else
                    {
                        MessageBox.Show("Plz Choose Correct Term", "Alert");
                        dr.Close();
                        con.Close();
                        Term_Amt_Txt.Text = "";
                        Total_Txt.Text = "";
                    }
                    dr.Close();
                    con.Close();
                }
                else if (Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM2")
                {
                    if (c == 0 && Terms_CBox.Text == "TERM1")
                    {
                        MessageBox.Show("Plz Pay", "Alert");
                        dr.Close();
                        con.Close();
                        Fees();
                    }
                    else if (c == 1 && Terms_CBox.Text == "TERM3")
                    {
                        MessageBox.Show("Plz Pay", "Alert");
                        dr.Close();
                        con.Close();
                        Fees();
                    }
                    else if (Terms_CBox.Text == "TERM2 is Exempted")
                    {
                        MessageBox.Show("This Term is Exempted", "Alert");
                        dr.Close();
                        con.Close();
                        Term_Amt_Txt.Text = "";
                        Total_Txt.Text = "";
                    }
                    else
                    {
                        MessageBox.Show("Plz Choose Correct Term", "Alert");
                        dr.Close();
                        con.Close();
                        Term_Amt_Txt.Text = "";
                        Total_Txt.Text = "";
                    }
                    dr.Close();
                    con.Close();
                }
                else if (Bill_Type_Txt.Text=="SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM1")
                {
                    if (c == 0 && Terms_CBox.Text == "TERM2")
                    {
                        MessageBox.Show("Plz Pay", "Alert");
                        dr.Close();
                        con.Close();
                        Fees();
                    }
                    else if (c == 1 && Terms_CBox.Text == "TERM3")
                    {
                        MessageBox.Show("Plz Pay", "Alert");
                        dr.Close();
                        con.Close();
                        Fees();
                    }
                    else if (Terms_CBox.Text == "TERM1 is Exempted")
                    {
                        MessageBox.Show("This Term is Exempted", "Alert");
                        dr.Close();
                        con.Close();
                        Term_Amt_Txt.Text = "";
                        Total_Txt.Text = "";
                    }
                    else
                    {
                        MessageBox.Show("Plz Choose Correct Term", "Alert");
                        dr.Close();
                        con.Close();
                        Term_Amt_Txt.Text = "";
                        Total_Txt.Text = "";
                    }
                    dr.Close();
                    con.Close();
                }
                else if (Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "NIL")
                {
                    if (Terms_CBox.Text == "TERM1 is Exempted")
                    {
                        MessageBox.Show("This Term is Exempted", "Alert");
                        dr.Close();
                        con.Close();
                        Term_Amt_Txt.Text = "";
                        Total_Txt.Text = "";
                    }
                    else if (Terms_CBox.Text == "TERM2 is Exempted")
                    {
                        MessageBox.Show("This Term is Exempted", "Alert");
                        dr.Close();
                        con.Close();
                        Term_Amt_Txt.Text = "";
                        Total_Txt.Text = "";
                    }
                    else if (Terms_CBox.Text == "TERM3 is Exempted")
                    {
                        MessageBox.Show("This Term is Exempted", "Alert");
                        dr.Close();
                        con.Close();
                        Term_Amt_Txt.Text = "";
                        Total_Txt.Text = "";
                    }
                    else
                    {
                        MessageBox.Show("Plz Choose Correct Term", "Alert");
                        dr.Close();
                        con.Close();
                        Term_Amt_Txt.Text = "";
                        Total_Txt.Text = "";
                    }
                    dr.Close();
                    con.Close();
                }
                else if(STerm_Txt.Text=="TERM1")
                {
                    if (c == 0 && Terms_CBox.Text == "TERM1")
                    {
                        MessageBox.Show("Plz Pay", "Alert");
                        dr.Close();
                        con.Close();
                        Fees();
                    }
                    else if (c == 1 && Terms_CBox.Text == "TERM2")
                    {
                        MessageBox.Show("Plz Pay", "Alert");
                        dr.Close();
                        con.Close();
                        Fees();
                    }
                    else if (c == 2 && Terms_CBox.Text == "TERM3")
                    {
                        MessageBox.Show("Plz Pay", "Alert");
                        dr.Close();
                        con.Close();
                        Fees();
                    }
                    else
                    {
                        MessageBox.Show("Plz Choose Correct Term", "Alert");
                        dr.Close();
                        con.Close();
                        Term_Amt_Txt.Text = "";
                        Total_Txt.Text = "";
                    }
                    dr.Close();
                    con.Close();
                }
                else if (STerm_Txt.Text == "TERM2")
                {
                    if (c == 0 && Terms_CBox.Text == "TERM2")
                    {
                        MessageBox.Show("Plz Pay", "Alert");
                        dr.Close();
                        con.Close();
                        Fees();
                    }
                    else if (c == 1 && Terms_CBox.Text == "TERM3")
                    {
                        MessageBox.Show("Plz Pay", "Alert");
                        dr.Close();
                        con.Close();
                        Fees();
                    }                    
                    else
                    {
                        MessageBox.Show("Plz Choose Correct Term", "Alert");
                        dr.Close();
                        con.Close();
                        Term_Amt_Txt.Text = "";
                        Total_Txt.Text = "";
                    }
                    dr.Close();
                    con.Close();
                }
                else if (STerm_Txt.Text == "TERM3")
                {
                    if (c == 0 && Terms_CBox.Text == "TERM3")
                    {
                        MessageBox.Show("Plz Pay", "Alert");
                        dr.Close();
                        con.Close();
                        Fees();
                    }                   
                    else
                    {
                        MessageBox.Show("Plz Choose Correct Term", "Alert");
                        dr.Close();
                        con.Close();
                        Term_Amt_Txt.Text = "";
                        Total_Txt.Text = "";
                    }
                    dr.Close();
                    con.Close();
                }

            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Fees()
        {
            try
            {
                query = "select Term_Fees from School_Fees_Master_Table where Class='" + Class_CBox.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Term_Type='" + Terms_CBox.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Term_Amt_Txt.Text = dr["Term_Fees"].ToString();
                }
                con.Close();
                Fine();
                amt();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Fine()
        {
            try
            {
                query = "select Fine_Amt from Fine_Master_Table where Class='" + Class_CBox.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Fine_Txt.Text = dr["Fine_Amt"].ToString();
                }
                con.Close();
                amt();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Group_Code_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            Fill_Std_Name();
        }        
        
        public void Fill_Std_Name()
        {
            try
            {
                Student_Name_CBox.Items.Clear();
                Student_Name_CBox.Text = "";
                Admis_No_Txt.Text = "";
                query = "select Std_Name from Student_Admission_Master_Table where SYear='"+SYear_CBox.Text+"' and EYear='"+EYear_Txt.Text+"' and Class='"+Class_CBox.Text+"' and Section='"+Sec_CBox.Text+"'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Student_Name_CBox.Items.Add(dr["Std_Name"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }       

        private void RePrint_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                con.Open();
                SqlDataAdapter da = new SqlDataAdapter("select * from Logined_Table where Logg_Id='1'", con);
                DataTable dt = new DataTable();
                da.Fill(dt);

                string st = dt.Rows[0].ItemArray[1].ToString();
                con.Close();

                if (st == "Admin")
                {
                    Bill_No = Interaction.InputBox("Enter the Bill No:", "Edit Admission Details", "SB", 50, 20);

                    if (Bill_No.ToString() == "")
                    {
                        //MessageBox.Show("Dont Print");
                    }
                    else
                    {
                        query = "select * from School_Bill_Master_Table where SBill_No='" + Bill_No + "'";
                        DataSet ds = new DataSet();
                        da = new SqlDataAdapter(query, con);
                        con.Open();
                        da.Fill(ds, "School_Bill_Master_Table");
                        con.Close();
                        CrystalReportSBP obj = new CrystalReportSBP();
                        obj.SetDataSource(ds.Tables["School_Bill_Master_Table"]);

                        ReportDocument crReportDocument;
                        crReportDocument = new ReportDocument();
                        crReportDocument = obj;
                        obj.Refresh();

                        System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                        crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                        crReportDocument.PrintToPrinter(1, true, 0, 0);
                    }
                }

                else
                {
                    if (Bill_No.ToString() == "")
                    {
                        //MessageBox.Show("Dont Print");
                    }
                    else
                    {
                        int count = 0;
                        con.Open();
                        query = "select count(SBill_No) from School_Bill_Master_Table";
                        SqlCommand cmd = new SqlCommand(query, con);
                        count = (int)cmd.ExecuteScalar();
                        if (count >= 1)
                        {
                            count = count + 100;
                        }
                        else
                        {
                            count = 100;
                        }
                        string billno = "SB";
                        Bill_No = billno + count.ToString();
                        con.Close();

                        query = "select * from School_Bill_Master_Table where SBill_No='" + Bill_No + "'";
                        DataSet ds = new DataSet();
                        da = new SqlDataAdapter(query, con);
                        con.Open();
                        da.Fill(ds, "School_Bill_Master_Table");
                        con.Close();
                        CrystalReportSBP obj = new CrystalReportSBP();
                        obj.SetDataSource(ds.Tables["School_Bill_Master_Table"]);

                        ReportDocument crReportDocument;
                        crReportDocument = new ReportDocument();
                        crReportDocument = obj;
                        obj.Refresh();

                        System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                        crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                        crReportDocument.PrintToPrinter(1, true, 0, 0);
                    }
                }

            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message.ToString());
            }
            Clear_Controls();
            Auto_Num();
            Fill_Grid();
        }

        private void STerm_Txt_TextChanged(object sender, EventArgs e)
        {
            try
            {
                if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1 is Exempted");
                    Terms_CBox.Items.Add("TERM2 is Exempted");
                    Terms_CBox.Items.Add("TERM3 is Exempted");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM2" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1 is Exempted");
                    Terms_CBox.Items.Add("TERM2 is Exempted");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM1" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1 is Exempted");
                }
                else if (STerm_Txt.Text == "TERM2" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM2 is Exempted");
                    Terms_CBox.Items.Add("TERM3 is Exempted");
                }
                else if (STerm_Txt.Text == "TERM2" && ETerm_Txt.Text == "TERM2" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM2 is Exempted");
                }
                else if (STerm_Txt.Text == "TERM3" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM3 is Exempted");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM3")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                    Terms_CBox.Items.Add("TERM2");
                    Terms_CBox.Items.Add("TERM3 is Exempted");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM2")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                    Terms_CBox.Items.Add("TERM2 is Exempted");
                    Terms_CBox.Items.Add("TERM3");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM1")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1 is Exempted");
                    Terms_CBox.Items.Add("TERM2");
                    Terms_CBox.Items.Add("TERM3");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM2" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM2")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                    Terms_CBox.Items.Add("TERM2 is Exempted");
                    Terms_CBox.Items.Add("TERM3");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM2" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM1")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1 is Exempted");
                    Terms_CBox.Items.Add("TERM2");
                    Terms_CBox.Items.Add("TERM3");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM1" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM1")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1 is Exempted");
                    Terms_CBox.Items.Add("TERM2");
                    Terms_CBox.Items.Add("TERM3");
                }
                else if (STerm_Txt.Text == "TERM2" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM3")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                    Terms_CBox.Items.Add("TERM2");
                    Terms_CBox.Items.Add("TERM3 is Exempted");
                }
                else if (STerm_Txt.Text == "TERM2" && ETerm_Txt.Text == "TERM2" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM2")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                    Terms_CBox.Items.Add("TERM2 is Exempted");
                    Terms_CBox.Items.Add("TERM3");
                }
                else if (STerm_Txt.Text == "TERM3" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM3")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                    Terms_CBox.Items.Add("TERM2");
                    Terms_CBox.Items.Add("TERM3 is Exempted");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "NIL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                    Terms_CBox.Items.Add("TERM2");
                    Terms_CBox.Items.Add("TERM3");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM2" && Bill_Type_Txt.Text == "NIL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                    Terms_CBox.Items.Add("TERM2");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM1" && Bill_Type_Txt.Text == "NIL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                }
                else if (STerm_Txt.Text == "TERM2" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "NIL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM2");
                    Terms_CBox.Items.Add("TERM3");
                }
                else if (STerm_Txt.Text == "TERM2" && ETerm_Txt.Text == "TERM2" && Bill_Type_Txt.Text == "NIL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM2");
                }
                else if (STerm_Txt.Text == "TERM3" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "NIL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM3");
                }
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }    
        }

        private void Class_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Class_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Sec_CBox.Focus();
                }
            }
        }

        private void Sec_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Sec_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Student_Name_CBox.Focus();
                }
            }
        }

        private void Student_Name_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Student_Name_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Terms_CBox.Focus();
                }
            }
        }

        private void Terms_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Terms_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Print_Btn.Focus();
                }
            }
        }

        private void SYear_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (SYear_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Class_CBox.Focus();
                }
            }
        }

        private void SYear_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                query = "select EYear from Academy_Year_Master_Table where SYear='" + SYear_CBox.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    EYear_Txt.Text = dr["EYear"].ToString().Trim();
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            Fill_Std_Name();
        }

        private void Print_Btn_Click(object sender, EventArgs e)
        {
            if (SBill_No_Txt.Text != "" && SBill_Date_Dtp.Text != "" && Class_CBox.Text != "" && Sec_CBox.Text != "" && Student_Name_CBox.Text != "" && Admis_No_Txt.Text != "" && Terms_CBox.Text != "" && SYear_CBox.Text != "" && EYear_Txt.Text != "" && Term_Amt_Txt.Text != "" && Fine_Txt.Text != "" && Total_Txt.Text != "" && Term_Amt_Txt.Text != "0" && Total_Txt.Text != "0")
            {
                try
                {
                    query = "Select * From School_Bill_Master_Table Where Admission_No='" + Admis_No_Txt.Text.ToString().Trim() + "' and Term_Type='" + Terms_CBox.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        MessageBox.Show("Already Exist", "Alert");
                        dr.Close();
                        con.Close();
                        Clear_Controls();
                        Auto_Num();
                        Fill_Grid();
                    }
                    else
                    {
                        dr.Close();
                        con.Close();

                        con.Open();
                        query = "insert into School_Bill_Master_Table values('" + SBill_No_Txt.Text.Trim() + "','" + SBill_Date_Dtp.Text.Trim() + "','" + Class_CBox.Text.Trim() + "','" + Sec_CBox.Text.Trim() + "','" + Student_Name_CBox.Text.Trim() + "','" + Admis_No_Txt.Text.Trim() + "','" + SYear_CBox.Text.Trim() + "','" + EYear_Txt.Text.Trim() + "','" + Terms_CBox.Text.Trim() + "'," + Term_Amt_Txt.Text.Trim() + "," + Fine_Txt.Text.Trim() + "," + Total_Txt.Text.Trim() + ")";
                        cmd = new SqlCommand(query, con);
                        cmd.ExecuteNonQuery();
                        con.Close();

                        con.Open();
                        query = "insert into Daily_Net_Amount_Master_Table values('" + SBill_No_Txt.Text.Trim() + "','" + SBill_Date_Dtp.Text.ToString().Trim() + "','" + Class_CBox.Text.Trim() + "','" + Sec_CBox.Text.Trim() + "','" + Student_Name_CBox.Text.Trim() + "','" + Admis_No_Txt.Text.Trim() + "','" + Description.ToString().Trim() + "'," + Total_Txt.Text.Trim() + ")";
                        cmd = new SqlCommand(query, con);
                        cmd.ExecuteNonQuery();
                        con.Close();

                        MessageBox.Show("Saved Successfully");
                        Fill_Grid();
                        Net_Amount();
                        DNet_Amount();
                        Print_Btn.Enabled = true;

                        if (STerm_Txt.Text=="TERM1" && ETerm_Txt.Text=="TERM3" && Terms_CBox.Text == "TERM3" && Bill_Type_Txt.Text=="NIL" && Exemp_Term_Txt.Text=="NIL")
                        {
                            try
                            {

                                con.Open();
                                query = "Update Pending_Payment_Table set SchoolBillPay='0' where Admission_No='" + Admis_No_Txt.Text + "'";
                                cmd = new SqlCommand(query, con);
                                cmd.ExecuteNonQuery();
                                // MessageBox.Show("Inserted Successfully");
                                con.Close();
                            }

                            catch (Exception Ex)
                            {
                                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                            }
                        }
                        else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM2" && Terms_CBox.Text == "TERM2" && Bill_Type_Txt.Text == "NIL" && Exemp_Term_Txt.Text == "NIL")
                        {
                            try
                            {

                                con.Open();
                                query = "Update Pending_Payment_Table set SchoolBillPay='0' where Admission_No='" + Admis_No_Txt.Text + "'";
                                cmd = new SqlCommand(query, con);
                                cmd.ExecuteNonQuery();
                                // MessageBox.Show("Inserted Successfully");
                                con.Close();
                            }

                            catch (Exception Ex)
                            {
                                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                            }
                        }
                        else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM1" && Terms_CBox.Text == "TERM1" && Bill_Type_Txt.Text == "NIL" && Exemp_Term_Txt.Text == "NIL")
                        {
                            try
                            {

                                con.Open();
                                query = "Update Pending_Payment_Table set SchoolBillPay='0' where Admission_No='" + Admis_No_Txt.Text + "'";
                                cmd = new SqlCommand(query, con);
                                cmd.ExecuteNonQuery();
                                // MessageBox.Show("Inserted Successfully");
                                con.Close();
                            }

                            catch (Exception Ex)
                            {
                                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                            }
                        }
                        else if (STerm_Txt.Text == "TERM2" && ETerm_Txt.Text == "TERM3" && Terms_CBox.Text == "TERM3" && Bill_Type_Txt.Text == "NIL" && Exemp_Term_Txt.Text == "NIL")
                        {
                            try
                            {

                                con.Open();
                                query = "Update Pending_Payment_Table set SchoolBillPay='0' where Admission_No='" + Admis_No_Txt.Text + "'";
                                cmd = new SqlCommand(query, con);
                                cmd.ExecuteNonQuery();
                                // MessageBox.Show("Inserted Successfully");
                                con.Close();
                            }

                            catch (Exception Ex)
                            {
                                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                            }
                        }
                        else if (STerm_Txt.Text == "TERM2" && ETerm_Txt.Text == "TERM2" && Terms_CBox.Text == "TERM2" && Bill_Type_Txt.Text == "NIL" && Exemp_Term_Txt.Text == "NIL")
                        {
                            try
                            {

                                con.Open();
                                query = "Update Pending_Payment_Table set SchoolBillPay='0' where Admission_No='" + Admis_No_Txt.Text + "'";
                                cmd = new SqlCommand(query, con);
                                cmd.ExecuteNonQuery();
                                // MessageBox.Show("Inserted Successfully");
                                con.Close();
                            }

                            catch (Exception Ex)
                            {
                                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                            }
                        }
                        else if (STerm_Txt.Text == "TERM3" && ETerm_Txt.Text == "TERM3" && Terms_CBox.Text == "TERM3" && Bill_Type_Txt.Text == "NIL" && Exemp_Term_Txt.Text == "NIL")
                        {
                            try
                            {

                                con.Open();
                                query = "Update Pending_Payment_Table set SchoolBillPay='0' where Admission_No='" + Admis_No_Txt.Text + "'";
                                cmd = new SqlCommand(query, con);
                                cmd.ExecuteNonQuery();
                                // MessageBox.Show("Inserted Successfully");
                                con.Close();
                            }

                            catch (Exception Ex)
                            {
                                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                            }
                        }
                        else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text=="SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM3" && Terms_CBox.Text == "TERM2")
                        {
                            try
                            {

                                con.Open();
                                query = "Update Pending_Payment_Table set SchoolBillPay='0' where Admission_No='" + Admis_No_Txt.Text + "'";
                                cmd = new SqlCommand(query, con);
                                cmd.ExecuteNonQuery();
                                // MessageBox.Show("Inserted Successfully");
                                con.Close();
                            }

                            catch (Exception Ex)
                            {
                                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                            }
                        }
                        else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM2" && Terms_CBox.Text == "TERM3")
                        {
                            try
                            {

                                con.Open();
                                query = "Update Pending_Payment_Table set SchoolBillPay='0' where Admission_No='" + Admis_No_Txt.Text + "'";
                                cmd = new SqlCommand(query, con);
                                cmd.ExecuteNonQuery();
                                // MessageBox.Show("Inserted Successfully");
                                con.Close();
                            }

                            catch (Exception Ex)
                            {
                                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                            }
                        }
                        else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM1" && Terms_CBox.Text == "TERM3")
                        {
                            try
                            {

                                con.Open();
                                query = "Update Pending_Payment_Table set SchoolBillPay='0' where Admission_No='" + Admis_No_Txt.Text + "'";
                                cmd = new SqlCommand(query, con);
                                cmd.ExecuteNonQuery();
                                // MessageBox.Show("Inserted Successfully");
                                con.Close();
                            }

                            catch (Exception Ex)
                            {
                                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                            }
                        }
                        else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM2" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM2" && Terms_CBox.Text == "TERM1")
                        {
                            try
                            {

                                con.Open();
                                query = "Update Pending_Payment_Table set SchoolBillPay='0' where Admission_No='" + Admis_No_Txt.Text + "'";
                                cmd = new SqlCommand(query, con);
                                cmd.ExecuteNonQuery();
                                // MessageBox.Show("Inserted Successfully");
                                con.Close();
                            }

                            catch (Exception Ex)
                            {
                                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                            }
                        }
                        else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM2" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM1" && Terms_CBox.Text == "TERM2")
                        {
                            try
                            {

                                con.Open();
                                query = "Update Pending_Payment_Table set SchoolBillPay='0' where Admission_No='" + Admis_No_Txt.Text + "'";
                                cmd = new SqlCommand(query, con);
                                cmd.ExecuteNonQuery();
                                // MessageBox.Show("Inserted Successfully");
                                con.Close();
                            }

                            catch (Exception Ex)
                            {
                                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                            }
                        }
                        else if (STerm_Txt.Text == "TERM2" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM3" && Terms_CBox.Text == "TERM2")
                        {
                            try
                            {

                                con.Open();
                                query = "Update Pending_Payment_Table set SchoolBillPay='0' where Admission_No='" + Admis_No_Txt.Text + "'";
                                cmd = new SqlCommand(query, con);
                                cmd.ExecuteNonQuery();
                                // MessageBox.Show("Inserted Successfully");
                                con.Close();
                            }

                            catch (Exception Ex)
                            {
                                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                            }
                        }
                        else if (STerm_Txt.Text == "TERM2" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM2" && Terms_CBox.Text == "TERM3")
                        {
                            try
                            {

                                con.Open();
                                query = "Update Pending_Payment_Table set SchoolBillPay='0' where Admission_No='" + Admis_No_Txt.Text + "'";
                                cmd = new SqlCommand(query, con);
                                cmd.ExecuteNonQuery();
                                // MessageBox.Show("Inserted Successfully");
                                con.Close();
                            }

                            catch (Exception Ex)
                            {
                                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                            }
                        }                      


                        if (SBill_No_Txt.Text != "" && SBill_Date_Dtp.Text != "")
                        {
                            try
                            {
                                query = "select * from School_Bill_Master_Table where SBill_No='" + SBill_No_Txt.Text + "'";
                                DataSet ds = new DataSet();
                                SqlDataAdapter da = new SqlDataAdapter(query, con);
                                con.Open();
                                da.Fill(ds, "School_Bill_Master_Table");
                                con.Close();
                                CrystalReportSBP obj = new CrystalReportSBP();
                                obj.SetDataSource(ds.Tables["School_Bill_Master_Table"]);

                                ReportDocument crReportDocument;
                                crReportDocument = new ReportDocument();
                                crReportDocument = obj;
                                obj.Refresh();

                                System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                                crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                                crReportDocument.PrintToPrinter(1, true, 0, 0);

                                RePrint_Btn.Enabled = true;

                            }
                            catch (Exception Ex)
                            {
                                MessageBox.Show(Ex.Message.ToString());
                            }
                        }
                        else
                        {
                            MessageBox.Show("Please Fill All the Fields!!!");
                        }
                        Clear_Controls();
                        Auto_Num();
                    }
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                MessageBox.Show("Please Fill All the Fields!!!");
            }
        }

        private void Clear_Btn_Click(object sender, EventArgs e)
        {
            DialogResult res = MessageBox.Show("Do You Want to Clear", "Clear", MessageBoxButtons.OKCancel, MessageBoxIcon.Information);
            if (res.Equals(DialogResult.OK))
            {
                try
                {
                    Clear_Controls();
                    Auto_Num();
                    Fill_Grid();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                MessageBox.Show("Please Check the Details!!!");
            }  
        }

        private void Close_Btn_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void Exemp_Term_Txt_TextChanged(object sender, EventArgs e)
        {
            try
            {
                if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1 is Exempted");
                    Terms_CBox.Items.Add("TERM2 is Exempted");
                    Terms_CBox.Items.Add("TERM3 is Exempted");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM2" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1 is Exempted");
                    Terms_CBox.Items.Add("TERM2 is Exempted");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM1" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1 is Exempted");
                }
                else if (STerm_Txt.Text == "TERM2" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM2 is Exempted");
                    Terms_CBox.Items.Add("TERM3 is Exempted");
                }
                else if (STerm_Txt.Text == "TERM2" && ETerm_Txt.Text == "TERM2" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM2 is Exempted");
                }
                else if (STerm_Txt.Text == "TERM3" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM3 is Exempted");
                }               
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM3")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                    Terms_CBox.Items.Add("TERM2");
                    Terms_CBox.Items.Add("TERM3 is Exempted");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM2")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                    Terms_CBox.Items.Add("TERM2 is Exempted");
                    Terms_CBox.Items.Add("TERM3");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM1")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1 is Exempted");
                    Terms_CBox.Items.Add("TERM2");
                    Terms_CBox.Items.Add("TERM3");
                }                
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM2" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM2")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                    Terms_CBox.Items.Add("TERM2 is Exempted");
                    Terms_CBox.Items.Add("TERM3");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM2" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM1")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1 is Exempted");
                    Terms_CBox.Items.Add("TERM2");
                    Terms_CBox.Items.Add("TERM3");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM1" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM1")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1 is Exempted");
                    Terms_CBox.Items.Add("TERM2");
                    Terms_CBox.Items.Add("TERM3");
                }
                else if (STerm_Txt.Text == "TERM2" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM3")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                    Terms_CBox.Items.Add("TERM2");
                    Terms_CBox.Items.Add("TERM3 is Exempted");
                }
                else if (STerm_Txt.Text == "TERM2" && ETerm_Txt.Text == "TERM2" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM2")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                    Terms_CBox.Items.Add("TERM2 is Exempted");
                    Terms_CBox.Items.Add("TERM3");
                }
                else if (STerm_Txt.Text == "TERM3" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM3")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                    Terms_CBox.Items.Add("TERM2");
                    Terms_CBox.Items.Add("TERM3 is Exempted");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "NIL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                    Terms_CBox.Items.Add("TERM2");
                    Terms_CBox.Items.Add("TERM3");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM2" && Bill_Type_Txt.Text == "NIL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                    Terms_CBox.Items.Add("TERM2");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM1" && Bill_Type_Txt.Text == "NIL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                }
                else if (STerm_Txt.Text == "TERM2" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "NIL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM2");
                    Terms_CBox.Items.Add("TERM3");
                }
                else if (STerm_Txt.Text == "TERM2" && ETerm_Txt.Text == "TERM2" && Bill_Type_Txt.Text == "NIL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM2");
                }
                else if (STerm_Txt.Text == "TERM3" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "NIL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM3");
                }     
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            } 
        }

        private void ETerm_Txt_TextChanged(object sender, EventArgs e)
        {
            try
            {
                if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1 is Exempted");
                    Terms_CBox.Items.Add("TERM2 is Exempted");
                    Terms_CBox.Items.Add("TERM3 is Exempted");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM2" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1 is Exempted");
                    Terms_CBox.Items.Add("TERM2 is Exempted");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM1" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1 is Exempted");
                }
                else if (STerm_Txt.Text == "TERM2" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM2 is Exempted");
                    Terms_CBox.Items.Add("TERM3 is Exempted");
                }
                else if (STerm_Txt.Text == "TERM2" && ETerm_Txt.Text == "TERM2" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM2 is Exempted");
                }
                else if (STerm_Txt.Text == "TERM3" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM3 is Exempted");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM3")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                    Terms_CBox.Items.Add("TERM2");
                    Terms_CBox.Items.Add("TERM3 is Exempted");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM2")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                    Terms_CBox.Items.Add("TERM2 is Exempted");
                    Terms_CBox.Items.Add("TERM3");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM1")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1 is Exempted");
                    Terms_CBox.Items.Add("TERM2");
                    Terms_CBox.Items.Add("TERM3");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM2" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM2")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                    Terms_CBox.Items.Add("TERM2 is Exempted");
                    Terms_CBox.Items.Add("TERM3");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM2" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM1")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1 is Exempted");
                    Terms_CBox.Items.Add("TERM2");
                    Terms_CBox.Items.Add("TERM3");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM1" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM1")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1 is Exempted");
                    Terms_CBox.Items.Add("TERM2");
                    Terms_CBox.Items.Add("TERM3");
                }
                else if (STerm_Txt.Text == "TERM2" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM3")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                    Terms_CBox.Items.Add("TERM2");
                    Terms_CBox.Items.Add("TERM3 is Exempted");
                }
                else if (STerm_Txt.Text == "TERM2" && ETerm_Txt.Text == "TERM2" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM2")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                    Terms_CBox.Items.Add("TERM2 is Exempted");
                    Terms_CBox.Items.Add("TERM3");
                }
                else if (STerm_Txt.Text == "TERM3" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "SCHOOL BILL" && Exemp_Term_Txt.Text == "TERM3")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                    Terms_CBox.Items.Add("TERM2");
                    Terms_CBox.Items.Add("TERM3 is Exempted");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "NIL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                    Terms_CBox.Items.Add("TERM2");
                    Terms_CBox.Items.Add("TERM3");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM2" && Bill_Type_Txt.Text == "NIL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                    Terms_CBox.Items.Add("TERM2");
                }
                else if (STerm_Txt.Text == "TERM1" && ETerm_Txt.Text == "TERM1" && Bill_Type_Txt.Text == "NIL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM1");
                }
                else if (STerm_Txt.Text == "TERM2" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "NIL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM2");
                    Terms_CBox.Items.Add("TERM3");
                }
                else if (STerm_Txt.Text == "TERM2" && ETerm_Txt.Text == "TERM2" && Bill_Type_Txt.Text == "NIL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM2");
                }
                else if (STerm_Txt.Text == "TERM3" && ETerm_Txt.Text == "TERM3" && Bill_Type_Txt.Text == "NIL" && Exemp_Term_Txt.Text == "NIL")
                {
                    Terms_CBox.Items.Clear();
                    Terms_CBox.Items.Add("TERM3");
                }
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            } 
        }                    
    }
}

      
