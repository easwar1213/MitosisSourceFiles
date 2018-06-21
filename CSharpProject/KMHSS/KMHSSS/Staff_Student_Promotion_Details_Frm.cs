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
    public partial class Staff_Student_Promotion_Details_Frm : Form
    {
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        string clss = "PRE KG", cls = "LKG", cls0 = "UKG", cls1 = "I", cls2 = "II", cls3 = "III", cls4 = "IV", cls5 = "V", cls6 = "VI", cls7 = "VII", cls8 = "VIII", cls9 = "IX", cls10 = "X", clsxp = "X PassedOut", cls11 = "XI", cls12 = "XII", clsxiip = "XII PassedOut";
        string query, query1;
        int syr = 0, eyr = 0,last=0;
        public Staff_Student_Promotion_Details_Frm()
        {
            InitializeComponent();
        }

        private void Staff_Student_Promotion_Details_Frm_Load(object sender, EventArgs e)
        {
            SYear_CBox.Focus();
            FillGrid();
            fill_AYear_CBox();
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
                                query = "update Student_Admission_Master_Table set SYear='" + syr.ToString() + "',EYear='" + eyr.ToString() + "',SMonth='JUNE',STerm='TERM1',Exemption='NO' where Admission_No='" + r.Cells[1].Value + "'";
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
            SYear_CBox.Text = "";
            EYear_Txt.Text = "";
            SYear_CBox.Focus();
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
    }
}
