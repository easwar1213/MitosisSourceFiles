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
    public partial class Van_Bill_Frm : Form
    {
        string query, query1, query3, month, Bill_No, Exemp = "YES", Bil_Ty = "VAN BILL", Ex_Month = "APRIL";
        int last = 0;
        string Description = "VAN BILL",namt,dnamt,Van ="YES";
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Van_Bill_Frm()
        {
            InitializeComponent();
        }

        private void Van_Bill_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                fill_Class_CBox();
                fill_AYear_CBox();
                Auto_Num();
                Fill_Grid();
                VBill_Date_Dtp.Value = DateTime.Now;
                //EMonth_Txt.Visible = false;
                Trip_Amt_Txt.Text = "0";
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
                query = "select row_number() over(order by VBill_No) as SNo,* from Van_Bill_Master_Table where Class='" + Class_CBox.Text + "' and Admission_No='" + Admis_No_Txt.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Van_Bill_Master_dataGridView1.DataSource = dt;
                Van_Bill_Master_dataGridView1.Columns[0].HeaderText = "SNo";
                Van_Bill_Master_dataGridView1.Columns[1].HeaderText = "Bill No";
                Van_Bill_Master_dataGridView1.Columns[2].HeaderText = "Bill Date";
                Van_Bill_Master_dataGridView1.Columns[3].HeaderText = "Class";
                Van_Bill_Master_dataGridView1.Columns[4].HeaderText = "Section";
                Van_Bill_Master_dataGridView1.Columns[5].HeaderText = "Student Name";
                Van_Bill_Master_dataGridView1.Columns[6].HeaderText = "SYear";
                Van_Bill_Master_dataGridView1.Columns[7].HeaderText = "EYear";
                Van_Bill_Master_dataGridView1.Columns[8].HeaderText = "SMonth";
                Van_Bill_Master_dataGridView1.Columns[9].HeaderText = "AYear";
                Van_Bill_Master_dataGridView1.Columns[10].HeaderText = "Month";
                Van_Bill_Master_dataGridView1.Columns[11].HeaderText = "Place";
                Van_Bill_Master_dataGridView1.Columns[12].HeaderText = "Trip Type";
                Van_Bill_Master_dataGridView1.Columns[13].HeaderText = "Trip Amount";
                Van_Bill_Master_dataGridView1.Columns[14].HeaderText = "Total";
                Van_Bill_Master_dataGridView1.Columns[0].Width = 120;
                Van_Bill_Master_dataGridView1.Columns[1].Width = 120;
                Van_Bill_Master_dataGridView1.Columns[2].Width = 120;
                Van_Bill_Master_dataGridView1.Columns[3].Width = 120;
                Van_Bill_Master_dataGridView1.Columns[4].Width = 120;
                Van_Bill_Master_dataGridView1.Columns[5].Width = 330;
                Van_Bill_Master_dataGridView1.Columns[6].Width = 150;
                Van_Bill_Master_dataGridView1.Columns[7].Width = 150;
                Van_Bill_Master_dataGridView1.Columns[8].Width = 150;
                Van_Bill_Master_dataGridView1.Columns[9].Width = 150;
                Van_Bill_Master_dataGridView1.Columns[10].Width = 200;
                Van_Bill_Master_dataGridView1.Columns[11].Width = 150;
                Van_Bill_Master_dataGridView1.Columns[12].Width = 150;
                Van_Bill_Master_dataGridView1.Columns[13].Width = 150;
                Van_Bill_Master_dataGridView1.Columns[14].Width = 150; 

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
                SqlCommand cmd = new SqlCommand("SELECT COUNT(VBill_No) as Tot FROM Van_Bill_Master_Table", con);
                SqlDataReader dr;
                dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    int i = Convert.ToInt32(dr["tot"]);

                    if (i > 0)
                    {
                        int j = i + 105;
                        VBill_No_Txt.Text = "VB" + j.ToString();

                    }
                    else
                    {
                        VBill_No_Txt.Text = "VB1";
                    }

                }
                con.Close();
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
                VBill_No_Txt.Text = "";
                VBill_Date_Dtp.Text = "";
                Class_CBox.Text = "";
                Sec_CBox.Text = "";
                Student_Name_CBox.Text = "";
                Admis_No_Txt.Text = "";
                SMonth_Txt.Text = "";
                SYear_CBox.Text = "";
                EYear_Txt.Text = "";
                Month_CBox.Text = "";
                Place_Txt.Text = "";
                Trip_Txt.Text = "";
                Trip_Amt_Txt.Text = "0";               
                Total_Txt.Text = "";
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
                query3 = "select sum(Total) from Daily_Net_Amount_Master_Table where Bill_Date='" + VBill_Date_Dtp.Text.ToString().Trim() + "' and Description='" + Description.ToString().Trim() + "'";
                SqlCommand cmd3 = new SqlCommand(query3, con);
                con.Open();
                SqlDataReader dr = cmd3.ExecuteReader();
                while (dr.Read())
                {
                    namt = dr[0].ToString();
                }
                dr.Close();
                con.Close();
                query = "Select * From Net_Amount_Table Where Description='" + Description.ToString().Trim() + "' and Bill_Date='" + VBill_Date_Dtp.Text.ToString().Trim() + "'";
                SqlCommand cmd = new SqlCommand(query, con);
                con.Open();
                dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    dr.Close();
                    query = "update Net_Amount_Table set Total=" + namt + " where Bill_Date='" + VBill_Date_Dtp.Text.ToString().Trim() + "' and Description='" + Description.ToString().Trim() + "' and Description='" + Description.ToString().Trim() + "'";
                    cmd = new SqlCommand(query, con);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                else
                {
                    dr.Close();
                    query = "insert Net_Amount_Table values('" + Description.ToString().Trim() + "'," + namt + ",'" + VBill_Date_Dtp.Text.ToString().Trim() + "')";
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
                query3 = "select sum(Total) from Net_Amount_Table where Bill_Date='" + VBill_Date_Dtp.Text.ToString().Trim() + "'";
                SqlCommand cmd3 = new SqlCommand(query3, con);
                con.Open();
                SqlDataReader dr = cmd3.ExecuteReader();
                while (dr.Read())
                {
                    dnamt = dr[0].ToString();
                }
                dr.Close();
                con.Close();
                query = "Select * From Daily_Turn_Over_Table Where Bill_Date='" + VBill_Date_Dtp.Text.ToString().Trim()+ "'";
                SqlCommand cmd = new SqlCommand(query, con);
                con.Open();
                dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    dr.Close();
                    query = "update Daily_Turn_Over_Table set Total='" + dnamt + "' where Bill_Date='" + VBill_Date_Dtp.Text.ToString().Trim()+ "'";
                    cmd = new SqlCommand(query, con);
                    cmd.ExecuteNonQuery();                    
                    con.Close();
                }
                else
                {
                    dr.Close();
                    query = "insert Daily_Turn_Over_Table values(" + dnamt + ",'" + VBill_Date_Dtp.Text.ToString().Trim() + "')";
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
            if (VBill_No_Txt.Text != "" && VBill_Date_Dtp.Text != "" && Class_CBox.Text != "" && Sec_CBox.Text != "" && Student_Name_CBox.Text != "" && Admis_No_Txt.Text != "" && SMonth_Txt.Text != "" && SYear_CBox.Text != "" && EYear_Txt.Text != "" && Month_CBox.Text != "" && Place_Txt.Text != "" && Trip_Txt.Text != "" && Trip_Amt_Txt.Text != "" && Total_Txt.Text != "" && Trip_Amt_Txt.Text != "0" && Total_Txt.Text != "0")
            {
                try
                {
                    query = "Select * From Van_Bill_Master_Table Where Admission_No='" + Admis_No_Txt.Text.ToString().Trim() + "' and Place='" + Place_Txt.Text.ToString().Trim() + "' and Trip_Type='" + Trip_Txt.Text.ToString().Trim() + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Month='" + Month_CBox.Text + "'";
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
                        query = "insert into Van_Bill_Master_Table values('" + VBill_No_Txt.Text.Trim() + "','" + VBill_Date_Dtp.Text.Trim() + "','" + Class_CBox.Text.Trim() + "','" + Sec_CBox.Text.Trim() + "','" + Student_Name_CBox.Text.Trim() + "','" + Admis_No_Txt.Text.Trim() + "','" + SYear_CBox.Text.Trim() + "','" + EYear_Txt.Text.Trim() + "','"+SMonth_Txt.Text.Trim() +"','" + Month_CBox.Text.Trim() + "','" + Place_Txt.Text.Trim() + "','" + Trip_Txt.Text.Trim() + "'," + Trip_Amt_Txt.Text.Trim() + "," + Total_Txt.Text.Trim() + ")";
                        query1 = "insert into Daily_Net_Amount_Master_Table values('" + VBill_No_Txt.Text.Trim() + "','" + VBill_Date_Dtp.Text.ToString().Trim() + "','" + Class_CBox.Text.Trim() + "','" + Sec_CBox.Text.Trim() + "','" + Student_Name_CBox.Text.Trim() + "','" + Admis_No_Txt.Text.Trim() + "','" + Description.ToString().Trim() + "'," + Total_Txt.Text.Trim() + ")";
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

                        if (Month_CBox.Text == EMonth_Txt.Text )
                        {
                            try
                            {
                                con.Open();
                                query = "Update Pending_Payment_Table set VanBillPay='0' where Admission_No='" + Admis_No_Txt.Text + "'";
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


                        if (VBill_No_Txt.Text != "" && VBill_Date_Dtp.Text != "")
                        {
                            try
                            {
                                query = "select * from Van_Bill_Master_Table where VBill_No='" + VBill_No_Txt.Text + "'";
                                DataSet ds = new DataSet();
                                SqlDataAdapter da = new SqlDataAdapter(query, con);
                                con.Open();
                                da.Fill(ds, "Van_Bill_Master_Table");
                                con.Close();
                                CrystalReportVBP obj = new CrystalReportVBP();
                                obj.SetDataSource(ds.Tables["Van_Bill_Master_Table"]);

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

        public void amt()
        {
            try
            {
                double amt = 0, tot = 0;
                if (Trip_Amt_Txt.Text != "")
                {
                    amt = Convert.ToDouble(Trip_Amt_Txt.Text);
                }            

                tot = amt ;
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
                Trip_Amt_Txt.Text = "0";
                query = "select Trip_Amt from Van_Fees_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Place='" + Place_Txt.Text + "' and Trip_Type='"+Trip_Txt.Text +"'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Trip_Amt_Txt.Text = dr["Trip_Amt"].ToString();
                }
                con.Close();
                amt();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
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
                Fill_Std();
                Fill_Grid();               
                amt();
                //tamt();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Fill_Std()
        {
            try
            {
                query = "select Admission_No,SMonth,Place,Trip_Type,EMonth from Student_Admission_Master_Table where Std_Name='" + Student_Name_CBox.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Admis_No_Txt.Text = dr["Admission_No"].ToString();
                    SMonth_Txt.Text = dr["SMonth"].ToString();
                    Place_Txt.Text = dr["Place"].ToString();
                    Trip_Txt.Text = dr["Trip_Type"].ToString();
                    EMonth_Txt.Text = dr["EMonth"].ToString();
                }
                con.Close();               
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Month_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                int c = 0;
                query = "Select * From Van_Bill_Master_Table Where Class='" + Class_CBox.Text.ToString().Trim() + "' and Std_Name='" + Student_Name_CBox.Text.ToString().Trim() + "' and Admission_No='" + Admis_No_Txt.Text.ToString().Trim() + "' and SYear='"+SYear_CBox.Text +"' and EYear='"+EYear_Txt.Text +"'";
                SqlCommand cmd = new SqlCommand(query, con);
                con.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    month = dr[6].ToString();
                    c++;
                }
                if (c == 0 && Month_CBox.SelectedIndex == 0)
                {
                    MessageBox.Show("Plz Pay", "Alert");
                    dr.Close();
                    con.Close();
                    tamt();
                }
                else if (c == 1 && Month_CBox.SelectedIndex == 1)
                {
                    MessageBox.Show("Plz Pay", "Alert");
                    dr.Close();
                    con.Close();
                    tamt();
                }
                else if (c == 2 && Month_CBox.SelectedIndex == 2)
                {
                    MessageBox.Show("Plz Pay", "Alert");
                    dr.Close();
                    con.Close();
                    tamt();
                }
                else if (c == 3 && Month_CBox.SelectedIndex == 3)
                {
                    MessageBox.Show("Plz Pay", "Alert");
                    dr.Close();
                    con.Close();
                    tamt();
                }
                else if (c == 4 && Month_CBox.SelectedIndex == 4)
                {
                    MessageBox.Show("Plz Pay", "Alert");
                    dr.Close();
                    con.Close();
                    tamt();
                }
                else if (c == 5 && Month_CBox.SelectedIndex == 5)
                {
                    MessageBox.Show("Plz Pay", "Alert");
                    dr.Close();
                    con.Close();
                    tamt();
                }
                else if (c == 6 && Month_CBox.SelectedIndex == 6)
                {
                    MessageBox.Show("Plz Pay", "Alert");
                    dr.Close();
                    con.Close();
                    tamt();
                }
                else if (c == 7 && Month_CBox.SelectedIndex == 7)
                {
                    MessageBox.Show("Plz Pay", "Alert");
                    dr.Close();
                    con.Close();
                    tamt();
                }
                else if (c == 8 && Month_CBox.SelectedIndex == 8)
                {
                    MessageBox.Show("Plz Pay", "Alert");
                    dr.Close();
                    con.Close();
                    tamt();
                }
                else if (c == 9 && Month_CBox.SelectedIndex == 9)
                {
                    MessageBox.Show("Plz Pay", "Alert");
                    dr.Close();
                    con.Close();
                    tamt();
                }
                else if (c == 10 && Month_CBox.SelectedIndex == 10)
                {
                    MessageBox.Show("Plz Pay", "Alert");
                    dr.Close();
                    con.Close();
                    tamt();
                }
                else if (c == 1 && Month_CBox.SelectedIndex == 1)
                {
                    MessageBox.Show("Plz Pay", "Alert");
                    dr.Close();
                    con.Close();
                    tamt();
                }
                else if (c == 11 && Month_CBox.SelectedIndex == 11)
                {
                    MessageBox.Show("Plz Pay", "Alert");
                    dr.Close();
                    con.Close();
                    tamt();
                }
                else
                {
                    MessageBox.Show("Plz Choose Correct Month", "Alert");
                    dr.Close();
                    con.Close();
                    Trip_Amt_Txt.Text = "";
                    Total_Txt.Text = "";
                }
                dr.Close();
                con.Close();
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
                query = "select Std_Name from Student_Admission_Master_Table where Admission_No not in (select Admission_No from Student_Admission_Master_Table where Exemption='" + Exemp + "' and Bill_Type='" + Bil_Ty + "' and Exemp_Month='" + Ex_Month + "') and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "'";
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
                        Bill_No = Interaction.InputBox("Enter the Bill No:", "Edit Admission Details", "VB", 50, 20);

                        if (Bill_No.ToString() == "")
                        {
                            //MessageBox.Show("Dont Print");
                        }
                        else
                        {
                            query = "select * from Van_Bill_Master_Table where VBill_No='" + Bill_No + "'";
                            DataSet ds = new DataSet();
                            da = new SqlDataAdapter(query, con);
                            con.Open();
                            da.Fill(ds, "Van_Bill_Master_Table");
                            con.Close();
                            CrystalReportVBP obj = new CrystalReportVBP();
                            obj.SetDataSource(ds.Tables["Van_Bill_Master_Table"]);

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
                            query = "select count(VBill_No) from Van_Bill_Master_Table";
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
                            string billno = "VB";
                            Bill_No = billno + count.ToString();
                            con.Close();

                            query = "select * from Van_Bill_Master_Table where VBill_No='" + Bill_No + "'";
                            DataSet ds = new DataSet();
                            da = new SqlDataAdapter(query, con);
                            con.Open();
                            da.Fill(ds, "Van_Bill_Master_Table");
                            con.Close();
                            CrystalReportVBP obj = new CrystalReportVBP();
                            obj.SetDataSource(ds.Tables["Van_Bill_Master_Table"]);

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
       
        private void SMonth_Txt_TextChanged(object sender, EventArgs e)
        {
            try
            {
                if (Class_CBox.Text != "IX" && Class_CBox.Text != "XI")
                {
                    if (SMonth_Txt.Text == "NIL")
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("JUNE");
                        Month_CBox.Items.Add("JULY");
                        Month_CBox.Items.Add("AUGUST");
                        Month_CBox.Items.Add("SEPTEMBER");
                        Month_CBox.Items.Add("OCTOBER");
                        Month_CBox.Items.Add("NOVEMBER");
                        Month_CBox.Items.Add("DECEMBER");
                        Month_CBox.Items.Add("JANUARY");
                        Month_CBox.Items.Add("FEBRUARY");
                        Month_CBox.Items.Add("MARCH");
                        Month_CBox.Items.Add("APRIL");

                    }
                    else if (SMonth_Txt.Text == "JANUARY")
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("JANUARY");
                        Month_CBox.Items.Add("FEBRUARY");
                        Month_CBox.Items.Add("MARCH");
                        Month_CBox.Items.Add("APRIL");
                    }
                    else if (SMonth_Txt.Text == "FEBRUARY")
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("FEBRUARY");
                        Month_CBox.Items.Add("MARCH");
                        Month_CBox.Items.Add("APRIL");
                    }
                    else if (SMonth_Txt.Text == "MARCH")
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("MARCH");
                        Month_CBox.Items.Add("APRIL");
                    }
                    else if (SMonth_Txt.Text == "APRIL")
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("APRIL");

                    }
                    else if (SMonth_Txt.Text == "JUNE")
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("JUNE");
                        Month_CBox.Items.Add("JULY");
                        Month_CBox.Items.Add("AUGUST");
                        Month_CBox.Items.Add("SEPTEMBER");
                        Month_CBox.Items.Add("OCTOBER");
                        Month_CBox.Items.Add("NOVEMBER");
                        Month_CBox.Items.Add("DECEMBER");
                        Month_CBox.Items.Add("JANUARY");
                        Month_CBox.Items.Add("FEBRUARY");
                        Month_CBox.Items.Add("MARCH");
                        Month_CBox.Items.Add("APRIL");
                    }
                    else if (SMonth_Txt.Text == "JULY")
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("JULY");
                        Month_CBox.Items.Add("AUGUST");
                        Month_CBox.Items.Add("SEPTEMBER");
                        Month_CBox.Items.Add("OCTOBER");
                        Month_CBox.Items.Add("NOVEMBER");
                        Month_CBox.Items.Add("DECEMBER");
                        Month_CBox.Items.Add("JANUARY");
                        Month_CBox.Items.Add("FEBRUARY");
                        Month_CBox.Items.Add("MARCH");
                        Month_CBox.Items.Add("APRIL");
                    }
                    else if (SMonth_Txt.Text == "AUGUST")
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("AUGUST");
                        Month_CBox.Items.Add("SEPTEMBER");
                        Month_CBox.Items.Add("OCTOBER");
                        Month_CBox.Items.Add("NOVEMBER");
                        Month_CBox.Items.Add("DECEMBER");
                        Month_CBox.Items.Add("JANUARY");
                        Month_CBox.Items.Add("FEBRUARY");
                        Month_CBox.Items.Add("MARCH");
                        Month_CBox.Items.Add("APRIL");
                    }
                    else if (SMonth_Txt.Text == "SEPTEMBER")
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("SEPTEMBER");
                        Month_CBox.Items.Add("OCTOBER");
                        Month_CBox.Items.Add("NOVEMBER");
                        Month_CBox.Items.Add("DECEMBER");
                        Month_CBox.Items.Add("JANUARY");
                        Month_CBox.Items.Add("FEBRUARY");
                        Month_CBox.Items.Add("MARCH");
                        Month_CBox.Items.Add("APRIL");
                    }
                    else if (SMonth_Txt.Text == "OCTOBER")
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("OCTOBER");
                        Month_CBox.Items.Add("NOVEMBER");
                        Month_CBox.Items.Add("DECEMBER");
                        Month_CBox.Items.Add("JANUARY");
                        Month_CBox.Items.Add("FEBRUARY");
                        Month_CBox.Items.Add("MARCH");
                        Month_CBox.Items.Add("APRIL");
                    }
                    else if (SMonth_Txt.Text == "NOVEMBER")
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("NOVEMBER");
                        Month_CBox.Items.Add("DECEMBER");
                        Month_CBox.Items.Add("JANUARY");
                        Month_CBox.Items.Add("FEBRUARY");
                        Month_CBox.Items.Add("MARCH");
                        Month_CBox.Items.Add("APRIL");
                    }
                    else if (SMonth_Txt.Text == "DECEMBER")
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("DECEMBER");
                        Month_CBox.Items.Add("JANUARY");
                        Month_CBox.Items.Add("FEBRUARY");
                        Month_CBox.Items.Add("MARCH");
                        Month_CBox.Items.Add("APRIL");
                    }
                    else
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("JUNE");
                        Month_CBox.Items.Add("JULY");
                        Month_CBox.Items.Add("AUGUST");
                        Month_CBox.Items.Add("SEPTEMBER");
                        Month_CBox.Items.Add("OCTOBER");
                        Month_CBox.Items.Add("NOVEMBER");
                        Month_CBox.Items.Add("DECEMBER");
                        Month_CBox.Items.Add("JANUARY");
                        Month_CBox.Items.Add("FEBRUARY");
                        Month_CBox.Items.Add("MARCH");
                        Month_CBox.Items.Add("APRIL");
                        Month_CBox.Items.Add("MAY");
                    }

                }
                else
                {
                    if (SMonth_Txt.Text == "NIL")
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("JUNE");
                        Month_CBox.Items.Add("JULY");
                        Month_CBox.Items.Add("AUGUST");
                        Month_CBox.Items.Add("SEPTEMBER");
                        Month_CBox.Items.Add("OCTOBER");
                        Month_CBox.Items.Add("NOVEMBER");
                        Month_CBox.Items.Add("DECEMBER");
                        Month_CBox.Items.Add("JANUARY");
                        Month_CBox.Items.Add("FEBRUARY");
                        Month_CBox.Items.Add("MARCH");
                        Month_CBox.Items.Add("APRIL");
                        Month_CBox.Items.Add("MAY");

                    }
                    else if (SMonth_Txt.Text == "JANUARY")
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("JANUARY");
                        Month_CBox.Items.Add("FEBRUARY");
                        Month_CBox.Items.Add("MARCH");
                        Month_CBox.Items.Add("APRIL");
                        Month_CBox.Items.Add("MAY");
                    }
                    else if (SMonth_Txt.Text == "FEBRUARY")
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("FEBRUARY");
                        Month_CBox.Items.Add("MARCH");
                        Month_CBox.Items.Add("APRIL");
                        Month_CBox.Items.Add("MAY");
                    }
                    else if (SMonth_Txt.Text == "MARCH")
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("MARCH");
                        Month_CBox.Items.Add("APRIL");
                        Month_CBox.Items.Add("MAY");
                    }
                    else if (SMonth_Txt.Text == "APRIL")
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("APRIL");
                        Month_CBox.Items.Add("MAY");

                    }
                    else if (SMonth_Txt.Text == "MAY")
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("MAY");
                    }
                    else if (SMonth_Txt.Text == "JUNE")
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("JUNE");
                        Month_CBox.Items.Add("JULY");
                        Month_CBox.Items.Add("AUGUST");
                        Month_CBox.Items.Add("SEPTEMBER");
                        Month_CBox.Items.Add("OCTOBER");
                        Month_CBox.Items.Add("NOVEMBER");
                        Month_CBox.Items.Add("DECEMBER");
                        Month_CBox.Items.Add("JANUARY");
                        Month_CBox.Items.Add("FEBRUARY");
                        Month_CBox.Items.Add("MARCH");
                        Month_CBox.Items.Add("APRIL");
                        Month_CBox.Items.Add("MAY");
                    }
                    else if (SMonth_Txt.Text == "JULY")
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("JULY");
                        Month_CBox.Items.Add("AUGUST");
                        Month_CBox.Items.Add("SEPTEMBER");
                        Month_CBox.Items.Add("OCTOBER");
                        Month_CBox.Items.Add("NOVEMBER");
                        Month_CBox.Items.Add("DECEMBER");
                        Month_CBox.Items.Add("JANUARY");
                        Month_CBox.Items.Add("FEBRUARY");
                        Month_CBox.Items.Add("MARCH");
                        Month_CBox.Items.Add("APRIL");
                        Month_CBox.Items.Add("MAY");
                    }
                    else if (SMonth_Txt.Text == "AUGUST")
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("AUGUST");
                        Month_CBox.Items.Add("SEPTEMBER");
                        Month_CBox.Items.Add("OCTOBER");
                        Month_CBox.Items.Add("NOVEMBER");
                        Month_CBox.Items.Add("DECEMBER");
                        Month_CBox.Items.Add("JANUARY");
                        Month_CBox.Items.Add("FEBRUARY");
                        Month_CBox.Items.Add("MARCH");
                        Month_CBox.Items.Add("APRIL");
                        Month_CBox.Items.Add("MAY");
                    }
                    else if (SMonth_Txt.Text == "SEPTEMBER")
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("SEPTEMBER");
                        Month_CBox.Items.Add("OCTOBER");
                        Month_CBox.Items.Add("NOVEMBER");
                        Month_CBox.Items.Add("DECEMBER");
                        Month_CBox.Items.Add("JANUARY");
                        Month_CBox.Items.Add("FEBRUARY");
                        Month_CBox.Items.Add("MARCH");
                        Month_CBox.Items.Add("APRIL");
                        Month_CBox.Items.Add("MAY");
                    }
                    else if (SMonth_Txt.Text == "OCTOBER")
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("OCTOBER");
                        Month_CBox.Items.Add("NOVEMBER");
                        Month_CBox.Items.Add("DECEMBER");
                        Month_CBox.Items.Add("JANUARY");
                        Month_CBox.Items.Add("FEBRUARY");
                        Month_CBox.Items.Add("MARCH");
                        Month_CBox.Items.Add("APRIL");
                        Month_CBox.Items.Add("MAY");
                    }
                    else if (SMonth_Txt.Text == "NOVEMBER")
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("NOVEMBER");
                        Month_CBox.Items.Add("DECEMBER");
                        Month_CBox.Items.Add("JANUARY");
                        Month_CBox.Items.Add("FEBRUARY");
                        Month_CBox.Items.Add("MARCH");
                        Month_CBox.Items.Add("APRIL");
                        Month_CBox.Items.Add("MAY");
                    }
                    else if (SMonth_Txt.Text == "DECEMBER")
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("DECEMBER");
                        Month_CBox.Items.Add("JANUARY");
                        Month_CBox.Items.Add("FEBRUARY");
                        Month_CBox.Items.Add("MARCH");
                        Month_CBox.Items.Add("APRIL");
                        Month_CBox.Items.Add("MAY");
                    }
                    else
                    {
                        Month_CBox.Items.Clear();
                        Month_CBox.Items.Add("JUNE");
                        Month_CBox.Items.Add("JULY");
                        Month_CBox.Items.Add("AUGUST");
                        Month_CBox.Items.Add("SEPTEMBER");
                        Month_CBox.Items.Add("OCTOBER");
                        Month_CBox.Items.Add("NOVEMBER");
                        Month_CBox.Items.Add("DECEMBER");
                        Month_CBox.Items.Add("JANUARY");
                        Month_CBox.Items.Add("FEBRUARY");
                        Month_CBox.Items.Add("MARCH");
                        Month_CBox.Items.Add("APRIL");
                        Month_CBox.Items.Add("MAY");
                    }

                }
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }        
        }

        private void Admis_No_Txt_TextChanged(object sender, EventArgs e)
        {

        }

        private void Trip_Txt_TextChanged(object sender, EventArgs e)
        {

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
                    Month_CBox.Focus();
                }
            }
        }
      
        private void Month_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Month_CBox.Text != "")
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
            //tamt();
            Fill_Std_Name();
        }

        private void Close_Btn_Click(object sender, EventArgs e)
        {
            this.Close();
        }      
    }
}
