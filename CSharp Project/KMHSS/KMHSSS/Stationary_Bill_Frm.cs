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
    public partial class Stationary_Bill_Frm : Form
    {
        string query, query1, query3, strosbid, samt, Bill_No, Exemp = "YES", Bil_Ty = "STATIONARY BILL";
        int last = 0;
        string Type = "SCHOOL";
        string Description = "STATIONARY BILL", namt, dnamt;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Stationary_Bill_Frm()
        {
            InitializeComponent();
        }

        private void Stationary_Bill_Frm_Load(object sender, EventArgs e)
        {
            
            try
            {
                fill_Class_CBox();
                fill_AYear_CBox();
                Auto_Num();
                Fill_Grid();
                SBill_Date_Dtp.Value = DateTime.Now;
                Delete_Btn.Enabled = false;
                Update_Btn.Enabled = false;                
                Price_Txt.Text = "0";
                Qty_Txt.Text = "";
                Amount_Txt.Text = "0";
                Total_Txt.Text = "";
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

        public void Auto_Num()
        {
            try
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("SELECT COUNT(SBill_No) as Tot FROM Stationary_Bill_Master_Table", con);
                SqlDataReader dr;
                dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    int i = Convert.ToInt32(dr["tot"]);

                    if (i > 0)
                    {
                        int j = i + 117;
                        SBill_No_Txt.Text = "STB" + j.ToString();

                    }
                    else
                    {
                        SBill_No_Txt.Text = "STB";
                    }

                }
                con.Close();
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
                query = "select row_number() over(order by SBill_No) as SNo,* from Stationary_Bill_Sub_Master_Table where SBill_No='" + SBill_No_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Other_Stationary_Bill_Master_dataGridView1.DataSource = dt;
                Other_Stationary_Bill_Master_dataGridView1.Columns[0].HeaderText = "SNo";
                Other_Stationary_Bill_Master_dataGridView1.Columns[1].HeaderText = "Particulars";
                Other_Stationary_Bill_Master_dataGridView1.Columns[2].HeaderText = "Price";
                Other_Stationary_Bill_Master_dataGridView1.Columns[3].HeaderText = "Qty";
                Other_Stationary_Bill_Master_dataGridView1.Columns[4].HeaderText = "Amount";
                Other_Stationary_Bill_Master_dataGridView1.Columns[5].HeaderText = "Bill No";                
                Other_Stationary_Bill_Master_dataGridView1.Columns[0].Width = 120;
                Other_Stationary_Bill_Master_dataGridView1.Columns[1].Width = 200;
                Other_Stationary_Bill_Master_dataGridView1.Columns[2].Width = 120;
                Other_Stationary_Bill_Master_dataGridView1.Columns[3].Width = 120;
                Other_Stationary_Bill_Master_dataGridView1.Columns[4].Width = 120;
                Other_Stationary_Bill_Master_dataGridView1.Columns[5].Width = 120;               

                Delete_Btn.Enabled = false;
                Update_Btn.Enabled = false;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Fill_Grid1()
        {
            try
            {
                query = "select * from Stationary_Bill_Master_Table where Admission_No='" + Admis_No_Txt.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Other_Stationary_Bill_Master_dataGridView1.DataSource = dt;
                Other_Stationary_Bill_Master_dataGridView1.Columns[0].HeaderText = "Bill No";
                Other_Stationary_Bill_Master_dataGridView1.Columns[1].HeaderText = "Bill Date";
                Other_Stationary_Bill_Master_dataGridView1.Columns[2].HeaderText = "Class";
                Other_Stationary_Bill_Master_dataGridView1.Columns[3].HeaderText = "Section";
                Other_Stationary_Bill_Master_dataGridView1.Columns[4].HeaderText = "Std Name";
                Other_Stationary_Bill_Master_dataGridView1.Columns[5].HeaderText = "Admis No";
                Other_Stationary_Bill_Master_dataGridView1.Columns[6].HeaderText = "SYear";
                Other_Stationary_Bill_Master_dataGridView1.Columns[7].HeaderText = "EYear";
                Other_Stationary_Bill_Master_dataGridView1.Columns[8].HeaderText = "Stationary Amt";
                Other_Stationary_Bill_Master_dataGridView1.Columns[9].HeaderText = "Other Amount";
                Other_Stationary_Bill_Master_dataGridView1.Columns[10].HeaderText = "Total";
                Other_Stationary_Bill_Master_dataGridView1.Columns[0].Width = 120;
                Other_Stationary_Bill_Master_dataGridView1.Columns[1].Width = 200;
                Other_Stationary_Bill_Master_dataGridView1.Columns[2].Width = 120;
                Other_Stationary_Bill_Master_dataGridView1.Columns[3].Width = 120;
                Other_Stationary_Bill_Master_dataGridView1.Columns[4].Width = 120;
                Other_Stationary_Bill_Master_dataGridView1.Columns[5].Width = 120;
                Other_Stationary_Bill_Master_dataGridView1.Columns[6].Width = 120;
                Other_Stationary_Bill_Master_dataGridView1.Columns[7].Width = 150;
                Other_Stationary_Bill_Master_dataGridView1.Columns[8].Width = 150;
                Other_Stationary_Bill_Master_dataGridView1.Columns[9].Width = 150;
                Other_Stationary_Bill_Master_dataGridView1.Columns[10].Width = 120;         
                Delete_Btn.Enabled = false;
                Update_Btn.Enabled = false;
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
                SBill_No_Txt.Text = "";
                SBill_Date_Dtp.Text = "";
                Class_CBox.Text = "";
                Sec_CBox.Text = "";
                Student_Name_CBox.Text = "";
                Admis_No_Txt.Text = "";
                SYear_CBox.Text = "";
                EYear_Txt.Text = "";
                Particulars_CBox.Text = "";
                Price_Txt.Text = "0";
                Qty_Txt.Text = "";
                Amount_Txt.Text = "0";
                Concession_Txt.Text = "0";
                Total_Txt.Text = "";
                Stationary_Fee_Txt.Text = "0";
                Stat_Amount_Txt.Text = "0";
                Stationary_Total_Txt.Text = "0";
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
                query3 = "select sum(Total) from Daily_Net_Amount_Master_Table where Bill_Date='" + SBill_Date_Dtp.Text.ToString().Trim()+ "' and Description='" + Description.ToString().Trim() + "'";
                SqlCommand cmd3 = new SqlCommand(query3, con);
                con.Open();
                SqlDataReader dr = cmd3.ExecuteReader();
                while (dr.Read())
                {
                    namt = dr[0].ToString();
                }
                dr.Close();
                con.Close();
                query = "Select * From Net_Amount_Table Where Description='" + Description.ToString().Trim() + "' and Bill_Date='" + SBill_Date_Dtp.Text.ToString().Trim() + "'";
                SqlCommand cmd = new SqlCommand(query, con);
                con.Open();
                dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    dr.Close();
                    query = "update Net_Amount_Table set Total=" + namt + " where Bill_Date='" + SBill_Date_Dtp.Text.ToString().Trim() + "' and Description='" + Description.ToString().Trim() + "' and Description='" + Description.ToString().Trim() + "'";
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

        public void Add()
        {
            if (SBill_No_Txt.Text != "" && Particulars_CBox.Text != "" && Qty_Txt.Text != "" && Price_Txt.Text != "" && Amount_Txt.Text != "")
            {
                try
                {
                    query = "Select * From Stationary_Bill_Sub_Master_Table Where Particulars='" + Particulars_CBox.ToString().Trim() + "' ";
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        MessageBox.Show("Already Exist", "Alert");
                        dr.Close();
                        con.Close();
                        //Clear_Controls();
                    }
                    else
                    {
                        dr.Close();
                        con.Close();
                        query = "insert into Stationary_Bill_Sub_Master_Table values('" + Particulars_CBox.Text + "'," + Price_Txt.Text + "," + Qty_Txt.Text + "," + Amount_Txt.Text + ",'" + SBill_No_Txt.Text + "')";
                        cmd = new SqlCommand(query, con);
                        con.Open();
                        cmd.ExecuteNonQuery();
                        MessageBox.Show("Added Successfully");
                        con.Close();
                        Particulars_CBox.Text = "";
                        Price_Txt.Text = "";
                        Qty_Txt.Text = "";
                        Total_Txt.Text = "0";
                        Particulars_CBox.Focus();
                        Fill_Grid();
                        amt();
                        Particulars_CBox.Focus();
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

        private void Add_Btn_Click(object sender, EventArgs e)
        {
            Add();
        }          

        private void Print_Btn_Click(object sender, EventArgs e)
        {
            if (SBill_No_Txt.Text != "" && SBill_Date_Dtp.Text != "" && Class_CBox.Text != "" && Sec_CBox.Text != "" && Student_Name_CBox.Text != "" && Admis_No_Txt.Text != "" && SYear_CBox.Text != "" && EYear_Txt.Text!="" && Total_Txt.Text != "" && Total_Txt.Text != "0")
            {
                try
                {
                    query = "Select * From Stationary_Bill_Master_Table Where Admission_No='" + Admis_No_Txt.Text.ToString().Trim() + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
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
                        query = "insert into Stationary_Bill_Master_Table values('" + SBill_No_Txt.Text.Trim() + "','" + SBill_Date_Dtp.Text.Trim() + "','" + Class_CBox.Text.Trim() + "','" + Sec_CBox.Text.Trim() + "','" + Student_Name_CBox.Text.Trim() + "','" + Admis_No_Txt.Text.Trim() + "','" + SYear_CBox.Text.Trim() + "','"+EYear_Txt.Text.Trim() +"'," + Stat_Amount_Txt.Text.Trim() + "," + Stationary_Total_Txt.Text.Trim() + "," + Total_Txt.Text.Trim() + ")";
                        query1 = "insert into Daily_Net_Amount_Master_Table values('" + SBill_No_Txt.Text.Trim() + "','" + SBill_Date_Dtp.Text.ToString().Trim() + "','" + Class_CBox.Text.Trim() + "','" + Sec_CBox.Text.Trim() + "','" + Student_Name_CBox.Text.Trim() + "','" + Admis_No_Txt.Text.Trim() + "','" + Description.ToString().Trim() + "'," + Total_Txt.Text.Trim() + ")";
                        cmd = new SqlCommand(query, con);
                        SqlCommand cmd1 = new SqlCommand(query1, con);
                        con.Open();
                        cmd.ExecuteNonQuery();
                        cmd1.ExecuteNonQuery();
                        MessageBox.Show("Saved Successfully");
                        con.Close();
                        Net_Amount();
                        DNet_Amount();
                        Print_Btn.Enabled = true;

                        try
                        {
                            con.Open();
                            query = "Update Pending_Payment_Table set StationaryBillPay='0' where Admission_No='" + Admis_No_Txt.Text + "'";
                            cmd = new SqlCommand(query, con);
                            cmd.ExecuteNonQuery();
                            // MessageBox.Show("Inserted Successfully");
                            con.Close();
                        }

                        catch (Exception Ex)
                        {
                            MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                        }
                        if (SBill_No_Txt.Text != "" && SBill_Date_Dtp.Text != "")
                        {
                            try
                            {
                                query = "select * from Stationary_Bill_Master_Table where SBill_No='" + SBill_No_Txt.Text + "'";
                                DataSet ds = new DataSet();
                                SqlDataAdapter da = new SqlDataAdapter(query, con);
                                con.Open();
                                da.Fill(ds, "Stationary_Bill_Master_Table");
                                con.Close();
                                CrystalReportSTBP obj = new CrystalReportSTBP();
                                obj.SetDataSource(ds.Tables["Stationary_Bill_Master_Table"]);

                                ReportDocument crReportDocument;
                                crReportDocument = new ReportDocument();
                                crReportDocument = obj;
                                obj.Refresh();

                                System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                                crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                                crReportDocument.PrintToPrinter(1, true, 0, 0);

                                Clear_Controls();
                                Fill_Grid();
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

        public void Updat()
        {
            if (SBill_No_Txt.Text != "" && SBill_Date_Dtp.Text != "" && Class_CBox.Text != "" && Sec_CBox.Text != "" && Student_Name_CBox.Text != "" && Admis_No_Txt.Text != "" && Particulars_CBox.Text != "" && Qty_Txt.Text != "" && Price_Txt.Text != "" && Amount_Txt.Text != "")
            {
                try
                {
                    query = "update Stationary_Bill_Sub_Master_Table set Particulars='" + Particulars_CBox.Text + "',Price=" + Price_Txt.Text + ",Qty=" + Qty_Txt.Text + ",Amount=" + Amount_Txt.Text + " where SBill_No='" + SBill_No_Txt.Text + "' and Particulars='" + Particulars_CBox.Text + "'";
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    MessageBox.Show("Updated Successfully");
                    con.Close();
                    Particulars_CBox.Text = "";
                    Price_Txt.Text = "";
                    Qty_Txt.Text = "";
                    Total_Txt.Text = "0";
                    Particulars_CBox.Focus();
                    amt();
                    Fill_Grid();
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

        private void Update_Btn_Click(object sender, EventArgs e)
        {
            Updat();
        }

        private void Delete_Btn_Click(object sender, EventArgs e)
        {
            DialogResult res = MessageBox.Show("Do You Want to Delete", "Delete", MessageBoxButtons.OKCancel, MessageBoxIcon.Information);
            if (res.Equals(DialogResult.OK))
            {
                if (SBill_No_Txt.Text != "" && SBill_Date_Dtp.Text != "" && Class_CBox.Text != "" && Sec_CBox.Text != "" && Student_Name_CBox.Text != "" && Admis_No_Txt.Text != "" && Particulars_CBox.Text != "" && Qty_Txt.Text != "" && Price_Txt.Text != "" && Amount_Txt.Text != "")
                {
                    try
                    {
                        query = "delete Stationary_Bill_Sub_Master_Table where Particulars='" + Particulars_CBox.Text + "'";
                        SqlCommand cmd = new SqlCommand(query, con);
                        con.Open();
                        cmd.ExecuteNonQuery();
                        MessageBox.Show("Deleted Successfully");
                        Particulars_CBox.Text = "";
                        Price_Txt.Text = "";
                        Qty_Txt.Text = "";
                        Total_Txt.Text = "0";
                        Particulars_CBox.Focus();
                        con.Close();
                        amt();
                        Fill_Grid();
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
            else
            {
                MessageBox.Show("Please Check the Details!!!");
            } 
        }

        private void Clear_Btn_Click(object sender, EventArgs e)
        {                        
             DialogResult res = MessageBox.Show("Do You Want to Clear", "Clear", MessageBoxButtons.OKCancel, MessageBoxIcon.Information);
             if (res.Equals(DialogResult.OK))
             {
                 try
                 {
                     query = "delete Stationary_Bill_Sub_Master_Table where SBill_No='" + SBill_No_Txt.Text + "'";
                     SqlCommand cmd = new SqlCommand(query, con);
                     con.Open();
                     cmd.ExecuteNonQuery();
                     con.Close();
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
       

        private void Qty_Txt_Leave(object sender, EventArgs e)
        {
            try
            {
                double cos = 0, qty = 0, tot = 0;
                if (Price_Txt.Text != "")
                {
                    cos = Convert.ToDouble(Price_Txt.Text);
                }

                if (Qty_Txt.Text != "")
                {
                    qty = Convert.ToDouble(Qty_Txt.Text);
                }

                if (Qty_Txt.Text == "0")
                {
                    MessageBox.Show("Plz Enter Valid Qty");
                }
                tot = cos * qty;
                Amount_Txt.Text = tot.ToString();
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
                double amt = 0, tot = 0, stamt=0;
                query = "select sum(Amount) from Stationary_Bill_Sub_Master_Table where SBill_No='" + SBill_No_Txt.Text + "'";
                SqlCommand cmd = new SqlCommand(query, con);
                con.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    samt = dr[0].ToString();
                }
                con.Close();
                amt = Convert.ToDouble(samt);
                Stationary_Total_Txt.Text = samt.ToString();
                stamt = Convert.ToDouble(Stat_Amount_Txt.Text);
                tot = stamt + amt;
                Total_Txt.Text = tot.ToString();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ssamt()
        {
            try
            {
                double amt = 0, tot = 0, stamt = 0;                                
                stamt = Convert.ToDouble(Stat_Amount_Txt.Text);
                tot = stamt + amt;
                Total_Txt.Text = tot.ToString();
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

        private void Student_Name_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                query = "select Admission_No,Concession_Amt,Bill_Type from Student_Admission_Master_Table where Std_Name='" + Student_Name_CBox.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Admis_No_Txt.Text = dr["Admission_No"].ToString();
                    Concession_Txt.Text = dr["Concession_Amt"].ToString();
                    Bill_Type_Txt.Text = dr["Bill_Type"].ToString();
                }
                con.Close();
                sta_amt();
                Fill_Grid1();
                Stationary();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Stationary()
        {
            try
            {
                query = "select Stationary_Fees from Stationary_Fees_Master_Table where Class='" + Class_CBox.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Stationary_Fee_Txt.Text = dr["Stationary_Fees"].ToString();
                }
                con.Close();
                sta_amt();               
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Particulars_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                query = "select Particulars_Price from Other_Fees_Master_Table where Particulars='" + Particulars_CBox.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Price_Txt.Text = dr["Particulars_Price"].ToString();
                }
                con.Close();
                Qty_Txt.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Sec_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                Fill_Std_Name();
                fill_Particulars_CBox();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
       
        public void fill_Particulars_CBox()
        {
            try
            {
                Particulars_CBox.Items.Clear();
                query = "select distinct(Particulars) from Other_Fees_Master_Table where Type='" + Type + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Particulars_CBox.Items.Add(dr["Particulars"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Qty_Txt_KeyPress(object sender, KeyPressEventArgs e)
        {
            char ch = e.KeyChar;
            if (!char.IsLetter(ch) && ch != 9 && ch.ToString() != "." && ch.ToString() != "," && ch.ToString() != "-" && ch.ToString() != "+" && ch.ToString() != "/" && ch.ToString() != "*" && ch.ToString() != "=" && ch.ToString() != "&" && ch.ToString() != "!" && ch.ToString() != "@" && ch.ToString() != "#" && ch.ToString() != "$" && ch.ToString() != "%" && ch.ToString() != "^" && ch.ToString() != "(" && ch.ToString() != ")" && ch.ToString() != "_" && ch.ToString() != "?" && ch.ToString() != "<" && ch.ToString() != ">" && ch.ToString() != ";" && ch.ToString() != ":" && ch.ToString() != "[" && ch.ToString() != "]" && ch.ToString() != "{" && ch.ToString() != "}" && ch.ToString() != "|")
            {
                e.Handled = false;

            }
            else
            {
                e.Handled = true;
            }
        }

        public void sta_amt()
        {
            try
            {
                double sfee = 0, con = 0, stamt = 0;
                if (Stationary_Fee_Txt.Text != "")
                {
                    sfee = Convert.ToDouble(Stationary_Fee_Txt.Text);
                }

                if (Concession_Txt.Text != "")
                {
                    con = Convert.ToDouble(Concession_Txt.Text);
                }

                stamt = sfee - con;
                Stat_Amount_Txt.Text = stamt.ToString();
                Total_Txt.Text = stamt.ToString();
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
                query = "select Std_Name from Student_Admission_Master_Table where Admission_No not in (select Admission_No from Student_Admission_Master_Table where Exemption='" + Exemp + "' and Bill_Type='" + Bil_Ty + "') and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "'";
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
       
        private void Stat_Amount_Txt_Leave(object sender, EventArgs e)
        {
            amt();
        }

        private void Qty_Txt_TextChanged(object sender, EventArgs e)
        {
            try
            {
                double cos = 0, qty = 0, tot = 0;
                if (Price_Txt.Text != "")
                {
                    cos = Convert.ToDouble(Price_Txt.Text);
                }

                if (Qty_Txt.Text != "")
                {
                    qty = Convert.ToDouble(Qty_Txt.Text);
                }

                if (Qty_Txt.Text == "0")
                {
                    MessageBox.Show("Plz Enter Valid Qty");
                }
                tot = cos * qty;
                Amount_Txt.Text = tot.ToString();
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
                    Bill_No = Interaction.InputBox("Enter the Bill No:", "Edit Admission Details", "STB", 50, 20);

                    if (Bill_No.ToString() == "")
                    {
                        //MessageBox.Show("Dont Print");
                    }
                    else
                    {
                        query = "select * from Stationary_Bill_Master_Table where SBill_No='" + Bill_No + "'";
                        DataSet ds = new DataSet();
                        da = new SqlDataAdapter(query, con);
                        con.Open();
                        da.Fill(ds, "Stationary_Bill_Master_Table");
                        con.Close();
                        CrystalReportSTBP obj = new CrystalReportSTBP();
                        obj.SetDataSource(ds.Tables["Stationary_Bill_Master_Table"]);
                        ReportDocument crReportDocument;
                        crReportDocument = new ReportDocument();
                        crReportDocument = obj;
                        obj.Refresh();
                        System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                        crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                        crReportDocument.PrintToPrinter(1, true, 0, 0);
                        Clear_Controls();
                        Fill_Grid();
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
                        query = "select count(SBill_No) from Stationary_Bill_Master_Table";
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
                        string billno = "STB";
                        Bill_No = billno + count.ToString();
                        con.Close();

                        query = "select * from Stationary_Bill_Master_Table where SBill_No='" + Bill_No + "'";
                        DataSet ds = new DataSet();
                        da = new SqlDataAdapter(query, con);
                        con.Open();
                        da.Fill(ds, "Stationary_Bill_Master_Table");
                        con.Close();
                        CrystalReportSTBP obj = new CrystalReportSTBP();
                        obj.SetDataSource(ds.Tables["Stationary_Bill_Master_Table"]);
                        ReportDocument crReportDocument;
                        crReportDocument = new ReportDocument();
                        crReportDocument = obj;
                        obj.Refresh();
                        System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                        crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                        crReportDocument.PrintToPrinter(1, true, 0, 0);
                        Clear_Controls();
                        Fill_Grid();
                    }
                }               
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message.ToString());
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
                    sta_amt();
                    Particulars_CBox.Focus();
                }
            }
        }      

        private void Particulars_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Particulars_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Qty_Txt.Focus();
                }
            }
        }

        private void Qty_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Qty_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    try
                    {
                        if (Delete_Btn.Enabled == true)
                        {
                            Updat();
                        }
                        else
                        {
                            Add();
                        }
                        Particulars_CBox.Focus();
                        Fill_Grid();
                    }
                    catch (Exception Ex)
                    {
                        MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    }
                }
            }
        }

        private void Other_Stationary_Bill_Master_dataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            try
            {
                strosbid = Other_Stationary_Bill_Master_dataGridView1.Rows[e.RowIndex].Cells[0].Value.ToString();
                Particulars_CBox.Text = Other_Stationary_Bill_Master_dataGridView1.Rows[e.RowIndex].Cells[1].Value.ToString();
                Price_Txt.Text = Other_Stationary_Bill_Master_dataGridView1.Rows[e.RowIndex].Cells[2].Value.ToString();
                Qty_Txt.Text = Other_Stationary_Bill_Master_dataGridView1.Rows[e.RowIndex].Cells[3].Value.ToString();
                Amount_Txt.Text = Other_Stationary_Bill_Master_dataGridView1.Rows[e.RowIndex].Cells[4].Value.ToString();
                SBill_No_Txt.Text = Other_Stationary_Bill_Master_dataGridView1.Rows[e.RowIndex].Cells[5].Value.ToString();
                Delete_Btn.Enabled = true;
                Update_Btn.Enabled = true;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Stationary_Bill_Frm_FormClosing(object sender, FormClosingEventArgs e)
        {
            try
            {
                query = "delete Stationary_Bill_Sub_Master_Table where SBill_No='" + SBill_No_Txt.Text + "'";
                SqlCommand cmd = new SqlCommand(query, con);
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
                Clear_Controls();
                Auto_Num();
                Fill_Grid();

            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
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
            Stationary();
        }

        private void Close_Btn_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void Price_Txt_KeyPress(object sender, KeyPressEventArgs e)
        {
            char ch = e.KeyChar;
            if (!char.IsLetter(ch) && ch != 9 && ch.ToString() != "." && ch.ToString() != "," && ch.ToString() != "-" && ch.ToString() != "+" && ch.ToString() != "/" && ch.ToString() != "*" && ch.ToString() != "=" && ch.ToString() != "&" && ch.ToString() != "!" && ch.ToString() != "@" && ch.ToString() != "#" && ch.ToString() != "$" && ch.ToString() != "%" && ch.ToString() != "^" && ch.ToString() != "(" && ch.ToString() != ")" && ch.ToString() != "_" && ch.ToString() != "?" && ch.ToString() != "<" && ch.ToString() != ">" && ch.ToString() != ";" && ch.ToString() != ":" && ch.ToString() != "[" && ch.ToString() != "]" && ch.ToString() != "{" && ch.ToString() != "}" && ch.ToString() != "|")
            {
                e.Handled = false;

            }
            else
            {
                e.Handled = true;
            }
        }       
        
    }
}

