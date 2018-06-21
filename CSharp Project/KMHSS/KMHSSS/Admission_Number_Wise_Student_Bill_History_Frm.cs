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
    public partial class Admission_Number_Wise_Student_Bill_History_Frm : Form
    {
        string query;
        int last = 0;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Admission_Number_Wise_Student_Bill_History_Frm()
        {
            InitializeComponent();
        }

        private void Admission_Number_Wise_Student_Bill_History_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                fill_AYear_CBox();
                SYear_CBox.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message);
            }
        }

        public void fill_AYear_CBox()
        {
            try
            {
                SYear_CBox.Items.Clear();
                query = "select distinct(SYear) from Academy_Year_Master_Table";
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

        public void AASFill_Grid()
        {
            try
            {
                query = "select * from School_Bill_Master_Table where Admission_No='"+Admission_No_Txt.Text+"' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Admission_Number_Wise_Student_Bill_History_dataGridView1.DataSource = dt;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void AAHFill_Grid()
        {
            try
            {
                query = "select * from Hostel_Bill_Master_Table where Admission_No='" + Admission_No_Txt.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Admission_Number_Wise_Student_Bill_History_dataGridView1.DataSource = dt;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void AAVFill_Grid()
        {
            try
            {
                query = "select * from Van_Bill_Master_Table where Admission_No='" + Admission_No_Txt.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Admission_Number_Wise_Student_Bill_History_dataGridView1.DataSource = dt;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void AATFill_Grid()
        {
            try
            {
                query = "select * from Stationary_Bill_Master_Table where Admission_No='" + Admission_No_Txt.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Admission_Number_Wise_Student_Bill_History_dataGridView1.DataSource = dt;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void AAOSFill_Grid()
        {
            try
            {
                query = "select * from Other_School_Bill_Master_Table where Admission_No='" + Admission_No_Txt.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Admission_Number_Wise_Student_Bill_History_dataGridView1.DataSource = dt;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void AAOHFill_Grid()
        {
            try
            {
                query = "select * from Other_Hostel_Bill_Master_Table where Admission_No='" + Admission_No_Txt.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Admission_Number_Wise_Student_Bill_History_dataGridView1.DataSource = dt;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ASFill_Grid()
        {
            try
            {
                query = "select * from School_Bill_Master_Table where Admission_No='" + Admission_No_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Admission_Number_Wise_Student_Bill_History_dataGridView1.DataSource = dt;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void AHFill_Grid()
        {
            try
            {
                query = "select * from Hostel_Bill_Master_Table where Admission_No='" + Admission_No_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Admission_Number_Wise_Student_Bill_History_dataGridView1.DataSource = dt;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void AVFill_Grid()
        {
            try
            {
                query = "select * from Van_Bill_Master_Table where Admission_No='" + Admission_No_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Admission_Number_Wise_Student_Bill_History_dataGridView1.DataSource = dt;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ATFill_Grid()
        {
            try
            {
                query = "select * from Stationary_Bill_Master_Table where Admission_No='" + Admission_No_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Admission_Number_Wise_Student_Bill_History_dataGridView1.DataSource = dt;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void AOSFill_Grid()
        {
            try
            {
                query = "select * from Other_School_Bill_Master_Table where Admission_No='" + Admission_No_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Admission_Number_Wise_Student_Bill_History_dataGridView1.DataSource = dt;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void AOHFill_Grid()
        {
            try
            {
                query = "select * from Other_Hostel_Bill_Master_Table where Admission_No='" + Admission_No_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Admission_Number_Wise_Student_Bill_History_dataGridView1.DataSource = dt;
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

        private void View_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                if (Admission_No_CHBox.Checked==true && AYear_CHBox.Checked == true && Bill_Type_CHBox.Checked==false)
                {
                    
                }
                else if (Admission_No_CHBox.Checked == true && AYear_CHBox.Checked == false && Bill_Type_CHBox.Checked == false)
                {
                    
                }
                else if (Admission_No_CHBox.Checked == true && AYear_CHBox.Checked == true && Bill_Type_CHBox.Checked == true && Bill_Type_CBox.SelectedIndex == 0)
                {
                    AASFill_Grid();
                    Admission_No_Txt.Focus();
                }
                else if (Admission_No_CHBox.Checked == true && AYear_CHBox.Checked == true && Bill_Type_CHBox.Checked == true && Bill_Type_CBox.SelectedIndex == 1)
                {
                    AAHFill_Grid();
                    Admission_No_Txt.Focus();
                }
                else if (Admission_No_CHBox.Checked == true && AYear_CHBox.Checked == true && Bill_Type_CHBox.Checked == true && Bill_Type_CBox.SelectedIndex == 2)
                {
                    AAVFill_Grid();
                    Admission_No_Txt.Focus();
                }
                else if (Admission_No_CHBox.Checked == true && AYear_CHBox.Checked == true && Bill_Type_CHBox.Checked == true && Bill_Type_CBox.SelectedIndex == 3)
                {
                    AATFill_Grid();
                    Admission_No_Txt.Focus();
                }
                else if (Admission_No_CHBox.Checked == true && AYear_CHBox.Checked == true && Bill_Type_CHBox.Checked == true && Bill_Type_CBox.SelectedIndex == 4)
                {
                    AAOSFill_Grid();
                    Admission_No_Txt.Focus();
                }
                else if (Admission_No_CHBox.Checked == true && AYear_CHBox.Checked == true && Bill_Type_CHBox.Checked == true && Bill_Type_CBox.SelectedIndex == 5)
                {
                    AAOHFill_Grid();
                    Admission_No_Txt.Focus();
                }
                else if (Admission_No_CHBox.Checked == true && AYear_CHBox.Checked == false && Bill_Type_CHBox.Checked == true && Bill_Type_CBox.SelectedIndex == 0)
                {
                    ASFill_Grid();
                    Admission_No_Txt.Focus();
                }
                else if (Admission_No_CHBox.Checked == true && AYear_CHBox.Checked == false && Bill_Type_CHBox.Checked == true && Bill_Type_CBox.SelectedIndex == 1)
                {
                    AHFill_Grid();
                    Admission_No_Txt.Focus();
                }
                else if (Admission_No_CHBox.Checked == true && AYear_CHBox.Checked == false && Bill_Type_CHBox.Checked == true && Bill_Type_CBox.SelectedIndex == 2)
                {
                    AVFill_Grid();
                    Admission_No_Txt.Focus();
                }
                else if (Admission_No_CHBox.Checked == true && AYear_CHBox.Checked == false && Bill_Type_CHBox.Checked == true && Bill_Type_CBox.SelectedIndex == 3)
                {
                    ATFill_Grid();
                    Admission_No_Txt.Focus();
                }
                else if (Admission_No_CHBox.Checked == true && AYear_CHBox.Checked == false && Bill_Type_CHBox.Checked == true && Bill_Type_CBox.SelectedIndex == 4)
                {
                    AOSFill_Grid();
                    Admission_No_Txt.Focus();
                }
                else if (Admission_No_CHBox.Checked == true && AYear_CHBox.Checked == false && Bill_Type_CHBox.Checked == true && Bill_Type_CBox.SelectedIndex == 4)
                {
                    AOHFill_Grid();
                    Admission_No_Txt.Focus();
                }  
                
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Admission_Number_Wise_Student_Bill_History_dataGridView1_CellValueNeeded(object sender, DataGridViewCellValueEventArgs e)
        {
            if (e.RowIndex >= 0 && e.ColumnIndex == 0)
            {
                e.Value = e.RowIndex + 1;
            }
        }

        private void Admission_No_CHBox_CheckedChanged(object sender, EventArgs e)
        {
            Admission_No_Txt.Focus();
        }

        private void AYear_CHBox_CheckedChanged(object sender, EventArgs e)
        {
            SYear_CBox.Focus();
        }

        private void Bill_Type_CHBox_CheckedChanged(object sender, EventArgs e)
        {
            Bill_Type_CBox.Focus();
        }

        private void Close_Btn_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
