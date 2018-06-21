using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Data.SqlClient;

namespace KMHSSS
{
    public partial class Student_Promotion_Details_Frm : Form
    {
        int last = 0;
        string clss = "PRE KG", cls = "LKG", cls0 = "UKG", cls1 = "I", cls2 = "II", cls3 = "III", cls4 = "IV", cls5 = "V", cls6 = "VI", cls7 = "VII", cls8 = "VIII", cls9 = "IX", cls10 = "X", clsxp = "X PassedOut", cls11 = "XI", cls12 = "XII", clsxiip = "XII PassedOut";
        string query,query1;
        int syr=0,eyr=0;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Student_Promotion_Details_Frm()
        {
            InitializeComponent();
        }

        private void Student_Promotion_Details_Frm_Load(object sender, EventArgs e)
        {
            SYear_CBox.Focus();
            FillGrid();
            fill_Class_CBox();
            fill_CAYear_CBox();
            fill_AYear_CBox();
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

        public void fill_CAYear_CBox()
        {
            try
            {
                CSYear_CBox.Items.Clear();
                query = "select SYear from Academy_Year_Master_Table";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    CSYear_CBox.Items.Add(dr["SYear"].ToString());
                }
                con.Close();
                last = CSYear_CBox.Items.Count - 1;
                CSYear_CBox.SelectedIndex = last;
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

        public void FillGrid()
        {
            try
            {
                query = "select P.Admission_No,A.SYear,A.EYear,A.Class,A.Section,A.Std_Name,A.Accomm_Type,A.Van from Pending_Payment_Table P,Student_Admission_Master_Table A where P.Admission_No=A.Admission_No and SchoolBillPay='0' AND HostelBillPay='0' AND VanBillPay='0' AND StationaryBillPay='0' order by A.Class,A.Section,A.Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Promotion_Details_Master_dataGridView1.DataSource = dt;
                Student_Promotion_Details_Master_dataGridView1.Columns[1].HeaderText = "Admission No";
                Student_Promotion_Details_Master_dataGridView1.Columns[1].Width = 130;
                Student_Promotion_Details_Master_dataGridView1.Columns[2].HeaderText = "SYear";
                Student_Promotion_Details_Master_dataGridView1.Columns[2].Width = 100;
                Student_Promotion_Details_Master_dataGridView1.Columns[3].HeaderText = "EYear";
                Student_Promotion_Details_Master_dataGridView1.Columns[3].Width = 100;
                Student_Promotion_Details_Master_dataGridView1.Columns[4].HeaderText = "Class";
                Student_Promotion_Details_Master_dataGridView1.Columns[4].Width = 100;
                Student_Promotion_Details_Master_dataGridView1.Columns[5].HeaderText = "Section";
                Student_Promotion_Details_Master_dataGridView1.Columns[5].Width = 100;
                Student_Promotion_Details_Master_dataGridView1.Columns[6].HeaderText = "Std Name";
                Student_Promotion_Details_Master_dataGridView1.Columns[6].Width = 175;
                Student_Promotion_Details_Master_dataGridView1.Columns[7].HeaderText = "Accomm Type";
                Student_Promotion_Details_Master_dataGridView1.Columns[7].Width = 150;
                Student_Promotion_Details_Master_dataGridView1.Columns[8].HeaderText = "Van";
                Student_Promotion_Details_Master_dataGridView1.Columns[8].Width = 100;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void CFill_Grid()
        {
            try
            {
                query = "select A.SYear,A.EYear,A.Class,A.Section,A.Std_Name,P.Admission_No,A.Accomm_Type,A.Van,P.SchoolBillPay,P.HostelBillPay,P.VanBillPay,P.StationaryBillPay from Pending_Payment_Table P,Student_Admission_Master_Table A where P.Admission_No=A.Admission_No and A.Admission_No not in( select P.Admission_No from Pending_Payment_Table P where P.SchoolBillPay='0' AND P.HostelBillPay='0' AND P.VanBillPay='0' AND P.StationaryBillPay='0' and P.SYear='" + CSYear_CBox.Text + "' and P.EYear='" + CEYear_Txt.Text + "' and P.Admission_No='" + Admis_No_Txt.Text + "') and P.Admission_No='" + Admis_No_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Promotion_Details_Master_dataGridView1.DataSource = dt;
                Student_Promotion_Details_Master_dataGridView1.Columns[1].HeaderText = "SYear";
                Student_Promotion_Details_Master_dataGridView1.Columns[2].HeaderText = "EYear";
                Student_Promotion_Details_Master_dataGridView1.Columns[3].HeaderText = "Class";
                Student_Promotion_Details_Master_dataGridView1.Columns[4].HeaderText = "Section";
                Student_Promotion_Details_Master_dataGridView1.Columns[5].HeaderText = "Std Name";
                Student_Promotion_Details_Master_dataGridView1.Columns[6].HeaderText = "Admis No";
                Student_Promotion_Details_Master_dataGridView1.Columns[7].HeaderText = "Accomm Type";
                Student_Promotion_Details_Master_dataGridView1.Columns[8].HeaderText = "Van";
                Student_Promotion_Details_Master_dataGridView1.Columns[9].HeaderText = "School Bill";
                Student_Promotion_Details_Master_dataGridView1.Columns[10].HeaderText = "Hostel Bill";
                Student_Promotion_Details_Master_dataGridView1.Columns[11].HeaderText = "Van Bill";
                Student_Promotion_Details_Master_dataGridView1.Columns[12].HeaderText = "Stationary Bill";
                Student_Promotion_Details_Master_dataGridView1.Columns[1].Width = 120;
                Student_Promotion_Details_Master_dataGridView1.Columns[2].Width = 120;
                Student_Promotion_Details_Master_dataGridView1.Columns[3].Width = 120;
                Student_Promotion_Details_Master_dataGridView1.Columns[4].Width = 120;
                Student_Promotion_Details_Master_dataGridView1.Columns[5].Width = 120;
                Student_Promotion_Details_Master_dataGridView1.Columns[6].Width = 200;
                Student_Promotion_Details_Master_dataGridView1.Columns[7].Width = 200;
                Student_Promotion_Details_Master_dataGridView1.Columns[8].Width = 200;
                Student_Promotion_Details_Master_dataGridView1.Columns[9].Width = 200;
                Student_Promotion_Details_Master_dataGridView1.Columns[10].Width = 200;
                Student_Promotion_Details_Master_dataGridView1.Columns[11].Width = 200;
                Student_Promotion_Details_Master_dataGridView1.Columns[12].Width = 200;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }


        private void Promote_Btn_Click(object sender, EventArgs e)
        {
            DialogResult res = MessageBox.Show("Please Check Are You Backuped Std DB & Do You Want to Promate", "Promate", MessageBoxButtons.OKCancel, MessageBoxIcon.Information);
            if (res.Equals(DialogResult.OK))
            {
                if (SYear_CBox.Text != "" && EYear_Txt.Text != "")
                {
                    query = "Select * From Academy_Year_Wise_Student_Admission_Master_Table Where SYear='" + SYear_CBox.Text.ToString().Trim() + "' and EYear='" + EYear_Txt.Text.ToString().Trim() + "'";
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        dr.Close();
                        con.Close();
                        foreach (DataGridViewRow r in Student_Promotion_Details_Master_dataGridView1.Rows)
                        {
                            try
                            {
                                int i = Student_Promotion_Details_Master_dataGridView1.CurrentRow.Index + 1;

                                con.Open();
                                query = "update Student_Admission_Master_Table set Class='" + clsxiip + "' where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls12 + "'";
                                query1 = "update Student_Contact_Details_Table set Class='" + clsxiip + "' where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls12 + "'";
                                cmd = new SqlCommand(query, con);
                                SqlCommand cmd1 = new SqlCommand(query1, con);
                                cmd.ExecuteNonQuery();
                                cmd1.ExecuteNonQuery();
                                con.Close();

                                con.Open();
                                query = "update Student_Admission_Master_Table set Class='" + cls12 + "' where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls11 + "'";
                                query1 = "update Student_Contact_Details_Table set Class='" + cls12 + "' where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls11 + "'";
                                cmd = new SqlCommand(query, con);
                                cmd1 = new SqlCommand(query1, con);
                                cmd.ExecuteNonQuery();
                                cmd1.ExecuteNonQuery();
                                con.Close();

                                con.Open();
                                query = "update Student_Admission_Master_Table set Class='" + clsxp + "' where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls10 + "'";
                                query1 = "update Student_Contact_Details_Table set Class='" + clsxp + "' where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls10 + "'";
                                cmd = new SqlCommand(query, con);
                                cmd1 = new SqlCommand(query1, con);
                                cmd.ExecuteNonQuery();
                                cmd1.ExecuteNonQuery();
                                con.Close();

                                con.Open();
                                query = "update Student_Admission_Master_Table set Class='" + cls10 + "' where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls9 + "'";
                                query1 = "update Student_Contact_Details_Table set Class='" + cls10 + "' where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls9 + "'";
                                cmd = new SqlCommand(query, con);
                                cmd1 = new SqlCommand(query1, con);
                                cmd.ExecuteNonQuery();
                                cmd1.ExecuteNonQuery();
                                con.Close();

                                con.Open();
                                query = "update Student_Admission_Master_Table set Class='" + cls9 + "' where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls8 + "'";
                                query1 = "update Student_Contact_Details_Table set Class='" + cls9 + "' where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls8 + "'";
                                cmd = new SqlCommand(query, con);
                                cmd1 = new SqlCommand(query1, con);
                                cmd.ExecuteNonQuery();
                                cmd1.ExecuteNonQuery();
                                con.Close();

                                con.Open();
                                query = "update Student_Admission_Master_Table set Class='" + cls8 + "' where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls7 + "'";
                                query1 = "update Student_Contact_Details_Table set Class='" + cls8 + "' where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls7 + "'";
                                cmd = new SqlCommand(query, con);
                                cmd1 = new SqlCommand(query1, con);
                                cmd.ExecuteNonQuery();
                                cmd1.ExecuteNonQuery();
                                con.Close();

                                con.Open();
                                query = "update Student_Admission_Master_Table set Class='" + cls7 + "' where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls6 + "'";
                                query1 = "update Student_Contact_Details_Table set Class='" + cls7 + "' where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls6 + "'";
                                cmd = new SqlCommand(query, con);
                                cmd1 = new SqlCommand(query1, con);
                                cmd.ExecuteNonQuery();
                                cmd1.ExecuteNonQuery();
                                con.Close();

                                con.Open();
                                query = "update Student_Admission_Master_Table set Class='" + cls6 + "' where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls5 + "'";
                                query1 = "update Student_Contact_Details_Table set Class='" + cls6 + "' where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls5 + "'";
                                cmd = new SqlCommand(query, con);
                                cmd1 = new SqlCommand(query1, con);
                                cmd.ExecuteNonQuery();
                                cmd1.ExecuteNonQuery();
                                con.Close();

                                con.Open();
                                query = "update Student_Admission_Master_Table set Class='" + cls5 + "' where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls4 + "'";
                                query1 = "update Student_Contact_Details_Table set Class='" + cls5 + "' where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls4 + "'";
                                cmd = new SqlCommand(query, con);
                                cmd1 = new SqlCommand(query1, con);
                                cmd.ExecuteNonQuery();
                                cmd1.ExecuteNonQuery();
                                con.Close();

                                con.Open();
                                query = "update Student_Admission_Master_Table set Class='" + cls4 + "' where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls3 + "'";
                                query1 = "update Student_Contact_Details_Table set Class='" + cls4 + "' where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls3 + "'";
                                cmd = new SqlCommand(query, con);
                                cmd1 = new SqlCommand(query1, con);
                                cmd.ExecuteNonQuery();
                                cmd1.ExecuteNonQuery();
                                con.Close();

                                con.Open();
                                query = "update Student_Admission_Master_Table set Class='" + cls3 + "' where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls2 + "'";
                                query1 = "update Student_Contact_Details_Table set Class='" + cls3 + "' where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls2 + "'";
                                cmd = new SqlCommand(query, con);
                                cmd1 = new SqlCommand(query1, con);
                                cmd.ExecuteNonQuery();
                                cmd1.ExecuteNonQuery();
                                con.Close();

                                con.Open();
                                query = "update Student_Admission_Master_Table set Class='" + cls2 + "' where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls1 + "'";
                                query1 = "update Student_Contact_Details_Table set Class='" + cls2 + "' where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls1 + "'";
                                cmd = new SqlCommand(query, con);
                                cmd1 = new SqlCommand(query1, con);
                                cmd.ExecuteNonQuery();
                                cmd1.ExecuteNonQuery();
                                con.Close();

                                con.Open();
                                query = "update Student_Admission_Master_Table set Class='" + cls1 + "' where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls0 + "'";
                                query1 = "update Student_Contact_Details_Table set Class='" + cls1 + "' where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls0 + "'";
                                cmd = new SqlCommand(query, con);
                                cmd1 = new SqlCommand(query1, con);
                                cmd.ExecuteNonQuery();
                                cmd1.ExecuteNonQuery();
                                con.Close();

                                con.Open();
                                query = "update Student_Admission_Master_Table set Class='" + cls0 + "'where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls + "'";
                                query1 = "update Student_Contact_Details_Table set Class='" + cls0 + "'where Admission_No='" + r.Cells[i].Value + "' AND Class='" + cls + "'";
                                cmd = new SqlCommand(query, con);
                                cmd1 = new SqlCommand(query1, con);
                                cmd.ExecuteNonQuery();
                                cmd1.ExecuteNonQuery();
                                con.Close();

                                con.Open();
                                query = "update Student_Admission_Master_Table set Class='" + cls + "'where Admission_No='" + r.Cells[i].Value + "' AND Class='" + clss + "'";
                                query1 = "update Student_Contact_Details_Table set Class='" + cls + "'where Admission_No='" + r.Cells[i].Value + "' AND Class='" + clss + "'";
                                cmd = new SqlCommand(query, con);
                                cmd1 = new SqlCommand(query1, con);
                                cmd.ExecuteNonQuery();
                                cmd1.ExecuteNonQuery();
                                con.Close();

                                query = "select SYear,EYear from Student_Admission_Master_Table where Admission_No='" + r.Cells[1].Value + "'";
                                cmd = new SqlCommand(query, con);
                                con.Open();
                                dr = cmd.ExecuteReader();
                                while (dr.Read())
                                {
                                    syr = Convert.ToInt32(dr["SYear"]) + 1;
                                    eyr = Convert.ToInt32(dr["EYear"]) + 1;
                                }
                                dr.Close();
                                con.Close();

                                con.Open();
                                query = "update Pending_Payment_Table set SYear='" + syr.ToString() + "',EYear='" + eyr.ToString() + "',SchoolBillPay=Pending_Payment_Table.SchoolBill,HostelBillPay=Pending_Payment_Table.HostelBill,VanBillPay=Pending_Payment_Table.VanBill,StationaryBillPay=Pending_Payment_Table.StationaryBill where Admission_No='" + r.Cells[1].Value + "'";
                                cmd = new SqlCommand(query, con);
                                cmd.ExecuteNonQuery();
                                con.Close();

                                con.Open();
                                query = "update Student_Admission_Master_Table set SYear='" + syr.ToString() + "',EYear='" + eyr.ToString() + "' where Admission_No='" + r.Cells[1].Value + "'";
                                query1 = "update Student_Contact_Details_Table set SYear='" + syr.ToString() + "',EYear='" + eyr.ToString() + "' where Admission_No='" + r.Cells[1].Value + "'";
                                cmd = new SqlCommand(query, con);
                                cmd1 = new SqlCommand(query1, con);
                                cmd.ExecuteNonQuery();
                                cmd1.ExecuteNonQuery();
                                con.Close();
                            }
                            catch (Exception Ex)
                            {
                                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                            }
                        }

                        MessageBox.Show("All Eligible Students Are Successfully Promoted");
                    }
                    else
                    {
                        dr.Close();
                        con.Close();

                        MessageBox.Show("Please Take Backup First");
                    }

                    cmd.Cancel();
                    con.Close();
                    FillGrid();
                    Clear_Controls();
                }
                else
                {
                    MessageBox.Show("Please Choose Academy Year");
                }
            }
            else
            {
                MessageBox.Show("Please Check the Details!!!");
            }   
        }

        public void Clear_Controls()
        {
            CSYear_CBox.Text = "";
            CEYear_Txt.Text = "";
            Class_CBox.Text = "";
            Sec_CBox.Text = "";
            Student_Name_CBox.Text = "";
            Admis_No_Txt.Text = "";
            SYear_CBox.Text = "";
            EYear_Txt.Text = "";
            SYear_CBox.Focus();
        }

        private void Backup_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                if (SYear_CBox.Text != "" && EYear_Txt.Text != "")
                {
                    query = "Select * From Academy_Year_Wise_Student_Admission_Master_Table where SYear='" + SYear_CBox.Text.ToString().Trim() + "' and EYear='" + EYear_Txt.Text.ToString().Trim() + "'";
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        MessageBox.Show("Already Backup");
                        Clear_Controls();
                        Promote_Btn.Focus();
                    }
                    else
                    {
                        dr.Close();
                        query = "insert into Academy_Year_Wise_Student_Admission_Master_Table select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                        cmd = new SqlCommand(query, con);
                        cmd.ExecuteNonQuery();
                        MessageBox.Show("Backup Successfully");
                        Clear_Controls();
                        Promote_Btn.Focus();
                    }
                    con.Close();
                    cmd.Cancel();                    
                }
                else
                {
                    MessageBox.Show("Please Choose Valid Academy Year");
                }
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

        public void Fill_Std_Name()
        {
            try
            {
                Student_Name_CBox.Items.Clear();
                Student_Name_CBox.Text = "";
                Admis_No_Txt.Text = "";
                query = "select Std_Name from Student_Admission_Master_Table where Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and SYear='" + CSYear_CBox.Text + "' and EYear='" + CEYear_Txt.Text + "'";
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

        private void Student_Name_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                query = "select Admission_No from Student_Admission_Master_Table where Std_Name='" + Student_Name_CBox.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Admis_No_Txt.Text = dr["Admission_No"].ToString();
                }
                dr.Close();
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void CSYear_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (CSYear_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Class_CBox.Focus();
                }
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
                    CFill_Grid();
                    CPromote_Btn.Focus();
                }
            }
        }
              
        private void SYear_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (SYear_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Backup_Btn.Focus();
                }
            }
        }    

        private void CPromote_Btn_Click(object sender, EventArgs e)
        {
            DialogResult res = MessageBox.Show("Please Check Are You Backuped Std DB & Do You Want to Promate", "Promate", MessageBoxButtons.OKCancel, MessageBoxIcon.Information);
            if (res.Equals(DialogResult.OK))
            {
                    try
                    {
                        if (Admis_No_Txt.Text != "")
                        {
                            con.Open();
                            query = "update Student_Admission_Master_Table set Class='" + clsxiip + "' where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls12 + "'";
                            query1 = "update Student_Contact_Details_Table set Class='" + clsxiip + "' where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls12 + "'";
                            SqlCommand cmd = new SqlCommand(query, con);
                            SqlCommand cmd1 = new SqlCommand(query1, con);
                            cmd.ExecuteNonQuery();
                            cmd1.ExecuteNonQuery();
                            con.Close();

                            con.Open();
                            query = "update Student_Admission_Master_Table set Class='" + cls12 + "' where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls11 + "'";
                            query1 = "update Student_Contact_Details_Table set Class='" + cls12 + "' where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls11 + "'";
                            cmd = new SqlCommand(query, con);
                            cmd1 = new SqlCommand(query1, con);
                            cmd.ExecuteNonQuery();
                            cmd1.ExecuteNonQuery();
                            con.Close();

                            con.Open();
                            query = "update Student_Admission_Master_Table set Class='" + clsxp + "' where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls10 + "'";
                            query1 = "update Student_Contact_Details_Table set Class='" + clsxp + "' where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls10 + "'";
                            cmd = new SqlCommand(query, con);
                            cmd1 = new SqlCommand(query1, con);
                            cmd.ExecuteNonQuery();
                            cmd1.ExecuteNonQuery();
                            con.Close();

                            con.Open();
                            query = "update Student_Admission_Master_Table set Class='" + cls10 + "' where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls9 + "'";
                            query1 = "update Student_Contact_Details_Table set Class='" + cls10 + "' where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls9 + "'";
                            cmd = new SqlCommand(query, con);
                            cmd1 = new SqlCommand(query1, con);
                            cmd.ExecuteNonQuery();
                            cmd1.ExecuteNonQuery();
                            con.Close();

                            con.Open();
                            query = "update Student_Admission_Master_Table set Class='" + cls9 + "' where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls8 + "'";
                            query1 = "update Student_Contact_Details_Table set Class='" + cls9 + "' where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls8 + "'";
                            cmd = new SqlCommand(query, con);
                            cmd1 = new SqlCommand(query1, con);
                            cmd.ExecuteNonQuery();
                            cmd1.ExecuteNonQuery();
                            con.Close();

                            con.Open();
                            query = "update Student_Admission_Master_Table set Class='" + cls8 + "' where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls7 + "'";
                            query1 = "update Student_Contact_Details_Table set Class='" + cls8 + "' where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls7 + "'";
                            cmd = new SqlCommand(query, con);
                            cmd1 = new SqlCommand(query1, con);
                            cmd.ExecuteNonQuery();
                            cmd1.ExecuteNonQuery();
                            con.Close();

                            con.Open();
                            query = "update Student_Admission_Master_Table set Class='" + cls7 + "' where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls6 + "'";
                            query1 = "update Student_Contact_Details_Table set Class='" + cls7 + "' where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls6 + "'";
                            cmd = new SqlCommand(query, con);
                            cmd1 = new SqlCommand(query1, con);
                            cmd.ExecuteNonQuery();
                            cmd1.ExecuteNonQuery();
                            con.Close();

                            con.Open();
                            query = "update Student_Admission_Master_Table set Class='" + cls6 + "' where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls5 + "'";
                            query1 = "update Student_Contact_Details_Table set Class='" + cls6 + "' where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls5 + "'";
                            cmd = new SqlCommand(query, con);
                            cmd1 = new SqlCommand(query1, con);
                            cmd.ExecuteNonQuery();
                            cmd1.ExecuteNonQuery();
                            con.Close();

                            con.Open();
                            query = "update Student_Admission_Master_Table set Class='" + cls5 + "' where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls4 + "'";
                            query1 = "update Student_Contact_Details_Table set Class='" + cls5 + "' where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls4 + "'";
                            cmd = new SqlCommand(query, con);
                            cmd1 = new SqlCommand(query1, con);
                            cmd.ExecuteNonQuery();
                            cmd1.ExecuteNonQuery();
                            con.Close();

                            con.Open();
                            query = "update Student_Admission_Master_Table set Class='" + cls4 + "' where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls3 + "'";
                            query1 = "update Student_Contact_Details_Table set Class='" + cls4 + "' where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls3 + "'";
                            cmd = new SqlCommand(query, con);
                            cmd1 = new SqlCommand(query1, con);
                            cmd.ExecuteNonQuery();
                            cmd1.ExecuteNonQuery();
                            con.Close();

                            con.Open();
                            query = "update Student_Admission_Master_Table set Class='" + cls3 + "' where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls2 + "'";
                            query1 = "update Student_Contact_Details_Table set Class='" + cls3 + "' where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls2 + "'";
                            cmd = new SqlCommand(query, con);
                            cmd1 = new SqlCommand(query1, con);
                            cmd.ExecuteNonQuery();
                            cmd1.ExecuteNonQuery();
                            con.Close();

                            con.Open();
                            query = "update Student_Admission_Master_Table set Class='" + cls2 + "' where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls1 + "'";
                            query1 = "update Student_Contact_Details_Table set Class='" + cls2 + "' where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls1 + "'";
                            cmd = new SqlCommand(query, con);
                            cmd1 = new SqlCommand(query1, con);
                            cmd.ExecuteNonQuery();
                            cmd1.ExecuteNonQuery();
                            con.Close();

                            con.Open();
                            query = "update Student_Admission_Master_Table set Class='" + cls1 + "' where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls0 + "'";
                            query1 = "update Student_Contact_Details_Table set Class='" + cls1 + "' where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls0 + "'";
                            cmd = new SqlCommand(query, con);
                            cmd1 = new SqlCommand(query1, con);
                            cmd.ExecuteNonQuery();
                            cmd1.ExecuteNonQuery();
                            con.Close();

                            con.Open();
                            query = "update Student_Admission_Master_Table set Class='" + cls0 + "'where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls + "'";
                            query1 = "update Student_Contact_Details_Table set Class='" + cls0 + "'where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + cls + "'";
                            cmd = new SqlCommand(query, con);
                            cmd1 = new SqlCommand(query1, con);
                            cmd.ExecuteNonQuery();
                            cmd1.ExecuteNonQuery();
                            con.Close();

                            con.Open();
                            query = "update Student_Admission_Master_Table set Class='" + cls + "'where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + clss + "'";
                            query1 = "update Student_Contact_Details_Table set Class='" + cls + "'where Admission_No='" + Admis_No_Txt.Text + "' AND Class='" + clss + "'";
                            cmd = new SqlCommand(query, con);
                            cmd1 = new SqlCommand(query1, con);
                            cmd.ExecuteNonQuery();
                            cmd1.ExecuteNonQuery();
                            con.Close();

                            query = "select SYear,EYear from Student_Admission_Master_Table where Admission_No='" + Admis_No_Txt.Text + "'";
                            cmd = new SqlCommand(query, con);
                            con.Open();
                            SqlDataReader dr = cmd.ExecuteReader();
                            while (dr.Read())
                            {
                                syr = Convert.ToInt32(dr["SYear"]) + 1;
                                eyr = Convert.ToInt32(dr["EYear"]) + 1;
                            }
                            dr.Close();
                            con.Close();

                            con.Open();
                            query = "update Pending_Payment_Table set SYear='" + syr.ToString() + "',EYear='" + eyr.ToString() + "',SchoolBillPay=Pending_Payment_Table.SchoolBill,HostelBillPay=Pending_Payment_Table.HostelBill,VanBillPay=Pending_Payment_Table.VanBill,StationaryBillPay=Pending_Payment_Table.StationaryBill where Admission_No='" + Admis_No_Txt.Text + "'";
                            cmd = new SqlCommand(query, con);
                            cmd.ExecuteNonQuery();
                            con.Close();

                            con.Open();
                            query = "update Student_Admission_Master_Table set SYear='" + syr.ToString() + "',EYear='" + eyr.ToString() + "',SMonth='JUNE',STerm='TERM1',Exemption='NO' where Admission_No='" + Admis_No_Txt.Text + "'";
                            query1 = "update Student_Contact_Details_Table set SYear='" + syr.ToString() + "',EYear='" + eyr.ToString() + "' where Admission_No='" + Admis_No_Txt.Text + "'";
                            cmd = new SqlCommand(query, con);
                            cmd1 = new SqlCommand(query1, con);
                            cmd.ExecuteNonQuery();
                            cmd1.ExecuteNonQuery();
                            con.Close();

                            MessageBox.Show("The Student Has Been Conditional Based Promoted Successfully");
                            FillGrid();
                            Clear_Controls();
                        }
                        else
                        {
                            MessageBox.Show("Please Choose Ant Student To Conditional Promote");
                        }
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

        private void CSYear_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                query = "select EYear from Academy_Year_Master_Table where SYear='" + CSYear_CBox.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    CEYear_Txt.Text = dr["EYear"].ToString().Trim();
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            Fill_Std_Name();
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
        }

        private void Student_Promotion_Details_Master_dataGridView1_CellValueNeeded(object sender, DataGridViewCellValueEventArgs e)
        {
            if (e.RowIndex >= 0 && e.ColumnIndex == 0)
            {
                e.Value = e.RowIndex + 1;
            }
        }

        private void View_Btn_Click(object sender, EventArgs e)
        {
            CFill_Grid();
        }

        private void View_Btn_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                CPromote_Btn.Focus();
            }
        }

        private void Refresh_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                FillGrid();
                Clear_Controls();

            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Close_Btn_Click(object sender, EventArgs e)
        {
            this.Close();
        }     
               
    }
}
