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
    public partial class Other_Hostel_Bill_Frm : Form
    {
        string query, query1, query3, Bill_No, Exemp = "NO";
        int last = 0;
        string Description = "OTHER HOSTEL BILL", namt,dnamt;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Other_Hostel_Bill_Frm()
        {
            InitializeComponent();
        }

        private void Other_Hostel_Bill_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                fill_Class_CBox();
                fill_AYear_CBox();
                Auto_Num();
                Fill_Grid();
                OHBill_Date_Dtp.Value = DateTime.Now;
                Main_Amt_Txt.Text = "0";
                Deposite_Amt_Txt.Text = "0";                
                Total_Txt.Text = "0";
                Class_CBox.Focus();
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
                query = "select row_number() over(order by OHBill_No) as SNo,* from Other_Hostel_Bill_Master_Table where Class='" + Class_CBox.Text + "' and Admission_No='" + Admis_No_Txt.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Other_Hostel_Bill_Master_dataGridView1.DataSource = dt;
                Other_Hostel_Bill_Master_dataGridView1.Columns[0].HeaderText = "SNo";
                Other_Hostel_Bill_Master_dataGridView1.Columns[1].HeaderText = "Bill No";
                Other_Hostel_Bill_Master_dataGridView1.Columns[2].HeaderText = "Bill Date";
                Other_Hostel_Bill_Master_dataGridView1.Columns[3].HeaderText = "Class";
                Other_Hostel_Bill_Master_dataGridView1.Columns[4].HeaderText = "Section";
                Other_Hostel_Bill_Master_dataGridView1.Columns[5].HeaderText = "Student Name";
                Other_Hostel_Bill_Master_dataGridView1.Columns[6].HeaderText = "Admis No";
                Other_Hostel_Bill_Master_dataGridView1.Columns[7].HeaderText = "SYear";
                Other_Hostel_Bill_Master_dataGridView1.Columns[8].HeaderText = "EYear";
                Other_Hostel_Bill_Master_dataGridView1.Columns[9].HeaderText = "Deposite";
                Other_Hostel_Bill_Master_dataGridView1.Columns[10].HeaderText = "Main Type";
                Other_Hostel_Bill_Master_dataGridView1.Columns[11].HeaderText = "Main Amount";
                Other_Hostel_Bill_Master_dataGridView1.Columns[12].HeaderText = "Total";
                Other_Hostel_Bill_Master_dataGridView1.Columns[0].Width = 120;
                Other_Hostel_Bill_Master_dataGridView1.Columns[1].Width = 120;
                Other_Hostel_Bill_Master_dataGridView1.Columns[2].Width = 120;
                Other_Hostel_Bill_Master_dataGridView1.Columns[3].Width = 120;
                Other_Hostel_Bill_Master_dataGridView1.Columns[4].Width = 120;
                Other_Hostel_Bill_Master_dataGridView1.Columns[5].Width = 330;
                Other_Hostel_Bill_Master_dataGridView1.Columns[6].Width = 150;
                Other_Hostel_Bill_Master_dataGridView1.Columns[7].Width = 150;
                Other_Hostel_Bill_Master_dataGridView1.Columns[8].Width = 150;
                Other_Hostel_Bill_Master_dataGridView1.Columns[9].Width = 150;
                Other_Hostel_Bill_Master_dataGridView1.Columns[10].Width = 200;
                Other_Hostel_Bill_Master_dataGridView1.Columns[11].Width = 150;
                Other_Hostel_Bill_Master_dataGridView1.Columns[12].Width = 150;

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
                SqlCommand cmd = new SqlCommand("SELECT COUNT(OHBill_No) as Tot FROM Other_Hostel_Bill_Master_Table", con);
                SqlDataReader dr;
                dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    int i = Convert.ToInt32(dr["tot"]);

                    if (i > 0)
                    {
                        int j = i + 102;
                        OHBill_No_Txt.Text = "OHB" + j.ToString();

                    }
                    else
                    {
                        OHBill_No_Txt.Text = "OHB1";
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
            try
            {                
                Main_Amt_Txt.Text = "0";
                Deposite_Amt_Txt.Text = "0";                
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Clear_Controls()
        {
            try
            {
                OHBill_No_Txt.Text = "";
                OHBill_Date_Dtp.Text = "";
                Class_CBox.Text = "";
                Sec_CBox.Text = "";
                Student_Name_CBox.Text = "";
                Admis_No_Txt.Text = "";
                SYear_CBox.Text = "";
                EYear_Txt.Text = "";
                Main_Type_Txt.Text = "";
                Main_Amt_Txt.Text = "0";
                Deposite_Amt_Txt.Text = "0";                
                Total_Txt.Text = "0";
                fill_AYear_CBox();
                SYear_CBox.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Net_Amount()
        {
            try
            {
                query3 = "select sum(Total) from Daily_Net_Amount_Master_Table where Bill_Date='" + OHBill_Date_Dtp.Text.ToString().Trim() + "' and Description='" + Description.ToString().Trim() + "'";
                SqlCommand cmd3 = new SqlCommand(query3, con);
                con.Open();
                SqlDataReader dr = cmd3.ExecuteReader();
                while (dr.Read())
                {
                    namt = dr[0].ToString();
                }
                dr.Close();
                con.Close();
                query = "Select * From Net_Amount_Table Where Description='" + Description.ToString().Trim() + "' and Bill_Date='" + OHBill_Date_Dtp.Text.ToString().Trim() + "'";
                SqlCommand cmd = new SqlCommand(query, con);
                con.Open();
                dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    dr.Close();
                    query = "update Net_Amount_Table set Total=" + namt + " where Bill_Date='" + OHBill_Date_Dtp.Text.ToString().Trim() + "' and Description='" + Description.ToString().Trim() + "' and Description='" + Description.ToString().Trim() + "' ";
                    cmd = new SqlCommand(query, con);
                    cmd.ExecuteNonQuery();                    
                    con.Close();
                }
                else
                {
                    dr.Close();
                    query = "insert Net_Amount_Table values('" + Description.ToString().Trim() + "'," + namt + ",'" + OHBill_Date_Dtp.Text .ToString().Trim()+ "')";
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
                query3 = "select sum(Total) from Net_Amount_Table where Bill_Date='" + OHBill_Date_Dtp.Text.ToString().Trim() + "'";
                SqlCommand cmd3 = new SqlCommand(query3, con);
                con.Open();
                SqlDataReader dr = cmd3.ExecuteReader();
                while (dr.Read())
                {
                    dnamt = dr[0].ToString();
                }
                dr.Close();
                con.Close();
                query = "Select * From Daily_Turn_Over_Table Where Bill_Date='" + OHBill_Date_Dtp.Text.ToString().Trim()+ "'";
                SqlCommand cmd = new SqlCommand(query, con);
                con.Open();
                dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    dr.Close();
                    query = "update Daily_Turn_Over_Table set Total='" + dnamt + "' where Bill_Date='" + OHBill_Date_Dtp.Text.ToString().Trim() + "'";
                    cmd = new SqlCommand(query, con);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                else
                {
                    dr.Close();
                    query = "insert Daily_Turn_Over_Table values(" + dnamt + ",'" + OHBill_Date_Dtp.Text.ToString().Trim() + "')";
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
               
      
        private void Print_Btn_Click(object sender, EventArgs e)
        {
            if (OHBill_No_Txt.Text != "" && OHBill_Date_Dtp.Text != "" && Class_CBox.Text != "" && Sec_CBox.Text != "" && SYear_CBox.Text != "" && EYear_Txt.Text != "" && Student_Name_CBox.Text != "" && Admis_No_Txt.Text != "" && Deposite_Amt_Txt.Text != "" && Main_Amt_Txt.Text != "" && Total_Txt.Text != "" && Total_Txt.Text != "0")
            {
                try
                {
                    query = "Select * From Other_Hostel_Bill_Master_Table Where Admission_No='" + Admis_No_Txt.Text.ToString().Trim() + "' and Main_Type='" + Main_Type_Txt.Text.ToString().Trim() + "' and SYear='"+SYear_CBox.Text.ToString().Trim()+"' and EYear='"+EYear_Txt.Text.ToString().Trim()+"'";
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
                        query = "insert into Other_Hostel_Bill_Master_Table values('" + OHBill_No_Txt.Text.Trim() + "','" + OHBill_Date_Dtp.Text.Trim() + "','" + Class_CBox.Text.Trim() + "','" + Sec_CBox.Text.Trim() + "','" + Student_Name_CBox.Text.Trim() + "','" + Admis_No_Txt.Text.Trim() + "','" + SYear_CBox.Text.Trim() + "','"+EYear_Txt.Text.Trim() +"'," + Deposite_Amt_Txt.Text.Trim() + ",'" + Main_Type_Txt.Text.Trim() + "'," + Main_Amt_Txt.Text.Trim() + "," + Total_Txt.Text.Trim() + ")";
                        query1 = "insert into Daily_Net_Amount_Master_Table values('" + OHBill_No_Txt.Text.Trim() + "','" + OHBill_Date_Dtp.Text.ToString().Trim() + "','" + Class_CBox.Text.Trim() + "','" + Sec_CBox.Text.Trim() + "','" + Student_Name_CBox.Text.Trim() + "','" + Admis_No_Txt.Text.Trim() + "','" + Description.ToString().Trim() + "'," + Total_Txt.Text.Trim() + ")";
                        cmd = new SqlCommand(query, con);
                        SqlCommand cmd1 = new SqlCommand(query1, con);
                        con.Open();
                        cmd.ExecuteNonQuery();
                        cmd1.ExecuteNonQuery();
                        MessageBox.Show("Saved Successfully");
                        con.Close();
                        Fill_Grid();
                        Net_Amount();
                        DNet_Amount();
                        Print_Btn.Enabled = true;

                        if (OHBill_No_Txt.Text != "" && OHBill_Date_Dtp.Text != "")
                        {
                            try
                            {
                                query = "select * from Other_Hostel_Bill_Master_Table where OHBill_No='" + OHBill_No_Txt.Text + "'";
                                DataSet ds = new DataSet();
                                SqlDataAdapter da = new SqlDataAdapter(query, con);
                                con.Open();
                                da.Fill(ds, "Other_Hostel_Bill_Master_Table");
                                con.Close();
                                CrystalReportOHBP obj = new CrystalReportOHBP();
                                obj.SetDataSource(ds.Tables["Other_Hostel_Bill_Master_Table"]);

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

        private void Class_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            fill_Section_CBox();
            Fill_Std_Name();            
        }

        private void Sec_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            Fill_Std_Name();
        }

        private void Student_Name_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                query = "select Admission_No,Main_Type from Student_Admission_Master_Table where Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Std_Name='" + Student_Name_CBox.Text + "' order by Class,Section,Gender,Std_Name Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Admis_No_Txt.Text = dr["Admission_No"].ToString();
                    Main_Type_Txt.Text = dr["Main_Type"].ToString();
                }
                dr.Close();
                con.Close();
                Fill_Grid();
                Deposite();
                tamt();
                amt();                
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Deposite()
        {
            try
            {
                query = "select Deposit from Hostel_Deposit_Master_Table where Class='" + Class_CBox.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Deposite_Amt_Txt.Text = dr["Deposit"].ToString();
                }
                con.Close();
                amt();
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
                double damt = 0, mamt = 0,tot = 0;                

                if (Deposite_Amt_Txt.Text != "")
                {
                    damt = Convert.ToDouble(Deposite_Amt_Txt.Text);
                }

                if (Main_Amt_Txt.Text != "")
                {
                    mamt = Convert.ToDouble(Main_Amt_Txt.Text);
                }

                tot = damt + mamt;
                Total_Txt.Text = tot.ToString();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void tamt()
        {
            try
            {
                query = "select Main_Amt from Hostel_Maintance_Fees_Master_Table where Main_Type='" + Main_Type_Txt.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Main_Amt_Txt.Text = dr["Main_Amt"].ToString();
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
                query = "select Std_Name from Student_Admission_Master_Table where Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Accomm_Type='HOSTEL' and Exemption='" + Exemp + "'";
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

        private void checkBox1_CheckedChanged(object sender, EventArgs e)
        {
            if (checkBox1.Checked)
            {
                Deposite_Amt_Txt.Visible = true;
                Deposite();
            }
            else
            {
                Deposite_Amt_Txt.Visible = false;
                Deposite_Amt_Txt.Text = "0";
                amt();
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
                    Bill_No = Interaction.InputBox("Enter the Bill No:", "Edit Admission Details", "OHB", 50, 20);

                    if (Bill_No.ToString() == "")
                    {
                        //MessageBox.Show("Dont Print");
                    }
                    else
                    {
                        query = "select * from Other_Hostel_Bill_Master_Table where OHBill_No='" + Bill_No + "'";
                        DataSet ds = new DataSet();
                        da = new SqlDataAdapter(query, con);
                        con.Open();
                        da.Fill(ds, "Other_Hostel_Bill_Master_Table");
                        con.Close();
                        CrystalReportOHBP obj = new CrystalReportOHBP();
                        obj.SetDataSource(ds.Tables["Other_Hostel_Bill_Master_Table"]);

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
                        query = "select count(OHBill_No) from Other_School_Bill_Master_Table";
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
                        string billno = "OHB";
                        Bill_No = billno + count.ToString();
                        con.Close();

                        query = "select * from Other_Hostel_Bill_Master_Table where OHBill_No='" + Bill_No + "'";
                        DataSet ds = new DataSet();
                        da = new SqlDataAdapter(query, con);
                        con.Open();
                        da.Fill(ds, "Other_Hostel_Bill_Master_Table");
                        con.Close();
                        CrystalReportOHBP obj = new CrystalReportOHBP();
                        obj.SetDataSource(ds.Tables["Other_Hostel_Bill_Master_Table"]);

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
            Class_CBox.Focus();
        }

        private void checkBox2_CheckedChanged(object sender, EventArgs e)
        {
            if (checkBox2.Checked)
            {
                Main_Amt_Txt.Visible = true;
                tamt();
            }
            else
            {
                Main_Amt_Txt.Visible = false;
                Main_Amt_Txt.Text = "0";
                amt();
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
                    Print_Btn.Focus();
                }
            }
        }

        private void checkBox2_KeyDown(object sender, KeyEventArgs e)
        {
            if (checkBox2.Text!= "")
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

        private void Close_Btn_Click(object sender, EventArgs e)
        {
            this.Close();
        }                    
    }
}
