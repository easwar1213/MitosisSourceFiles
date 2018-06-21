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
    public partial class Academy_Year_Wise_Student_Details_Frm : Form
    {
        string query;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Academy_Year_Wise_Student_Details_Frm()
        {
            InitializeComponent();
        }

        private void Academy_Year_Wise_Student_Details_Frm_Load(object sender, EventArgs e)
        {
            fill_Class_CBox();
            fill_AYear_CBox();
            SYear_CBox.Focus();
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
                query = "select * from Academy_Year_Wise_Student_Admission_Master_Table where SYear='"+SYear_CBox.Text +"' and EYear='"+EYear_Txt.Text +"' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Academy_Year_Wise_Student_Details_dataGridView1.DataSource = dt;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[0].HeaderText = "Admis No";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[1].HeaderText = "Admis Date";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[2].HeaderText = "Student Name";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[3].HeaderText = "SYear";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[4].HeaderText = "EYear";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[5].HeaderText = "Class";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[6].HeaderText = "Section";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[7].HeaderText = "Group Code";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[8].HeaderText = "Branch";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[9].HeaderText = "Gender";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[10].HeaderText = "Accomm Type";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[11].HeaderText = "Van";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[12].HeaderText = "Place";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[13].HeaderText = "Trip Type";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[14].HeaderText = "Main Type";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[15].HeaderText = "SMonth";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[16].HeaderText = "Concession";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[0].Width = 120;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[1].Width = 120;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[2].Width = 350;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[3].Width = 120;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[4].Width = 120;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[5].Width = 120;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[6].Width = 120;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[7].Width = 150;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[8].Width = 330;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[9].Width = 120;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[10].Width = 200;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[11].Width = 150;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[12].Width = 330;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[13].Width = 150;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[14].Width = 150;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[15].Width = 150;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[16].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Fill_Grid2()
        {
            try
            {
                query = "select * from Academy_Year_Wise_Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' order by Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Academy_Year_Wise_Student_Details_dataGridView1.DataSource = dt;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[0].HeaderText = "Admis No";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[1].HeaderText = "Admis Date";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[2].HeaderText = "Student Name";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[3].HeaderText = "SYear";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[4].HeaderText = "EYear";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[5].HeaderText = "Class";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[6].HeaderText = "Section";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[7].HeaderText = "Group Code";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[8].HeaderText = "Branch";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[9].HeaderText = "Gender";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[10].HeaderText = "Accomm Type";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[11].HeaderText = "Van";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[12].HeaderText = "Place";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[13].HeaderText = "Trip Type";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[14].HeaderText = "Main Type";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[15].HeaderText = "SMonth";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[16].HeaderText = "Concession";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[0].Width = 120;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[1].Width = 120;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[2].Width = 350;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[3].Width = 120;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[4].Width = 120;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[5].Width = 120;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[6].Width = 120;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[7].Width = 150;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[8].Width = 330;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[9].Width = 120;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[10].Width = 200;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[11].Width = 150;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[12].Width = 330;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[13].Width = 150;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[14].Width = 150;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[15].Width = 150;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[16].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Fill_Grid3()
        {
            try
            {
                query = "select * from Academy_Year_Wise_Student_Admission_Master_Table where Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' order by Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Academy_Year_Wise_Student_Details_dataGridView1.DataSource = dt;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[0].HeaderText = "Admis No";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[1].HeaderText = "Admis Date";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[2].HeaderText = "Student Name";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[3].HeaderText = "SYear";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[4].HeaderText = "EYear";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[5].HeaderText = "Class";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[6].HeaderText = "Section";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[7].HeaderText = "Group Code";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[8].HeaderText = "Branch";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[9].HeaderText = "Gender";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[10].HeaderText = "Accomm Type";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[11].HeaderText = "Van";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[12].HeaderText = "Place";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[13].HeaderText = "Trip Type";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[14].HeaderText = "Main Type";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[15].HeaderText = "SMonth";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[16].HeaderText = "Concession";
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[0].Width = 120;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[1].Width = 120;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[2].Width = 350;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[3].Width = 120;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[4].Width = 120;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[5].Width = 120;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[6].Width = 120;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[7].Width = 150;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[8].Width = 330;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[9].Width = 120;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[10].Width = 200;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[11].Width = 150;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[12].Width = 330;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[13].Width = 150;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[14].Width = 150;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[15].Width = 150;
                Academy_Year_Wise_Student_Details_dataGridView1.Columns[16].Width = 120;
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

                if (AYear_CHBox.Checked == true && Class_CHBox.Checked==true)
                {
                    if (SYear_CBox.Text != "" && EYear_Txt.Text != "" && Class_CBox.Text != "" && Sec_CBox.Text != "")
                    {
                        Fill_Grid2();
                        SYear_CBox.Focus();
                    }
                    else
                    {
                        MessageBox.Show("Please Choose Class and Section");
                    }

                }
                else if (AYear_CHBox.Checked == true)
                {
                    if (SYear_CBox.Text != "" && EYear_Txt.Text != "")
                    {
                        Fill_Grid();
                        SYear_CBox.Focus();
                    }
                    else
                    {
                        MessageBox.Show("Please Choose Class and Section");
                    }
                }
                else if (Class_CHBox.Checked == true)
                {
                    if (Class_CBox.Text != "" && Sec_CBox.Text != "")
                    {
                        Fill_Grid3();
                        SYear_CBox.Focus();
                    }
                    else
                    {
                        MessageBox.Show("Please Choose Class and Section");
                    }
                }                
            }

            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Class_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            fill_Section_CBox();
        }

        private void SYear_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (SYear_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    View_Btn.Focus();
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
                    View_Btn.Focus();
                }
            }
        }

        private void AYear_RBtn_CheckedChanged(object sender, EventArgs e)
        {
            Class_CBox.Text = "";
            Sec_CBox.Text = "";
        }       

        private void SYear_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                query = "select EYear from Academy_Year_Master_Table where SYear='"+SYear_CBox.Text +"'";
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
    }
}
