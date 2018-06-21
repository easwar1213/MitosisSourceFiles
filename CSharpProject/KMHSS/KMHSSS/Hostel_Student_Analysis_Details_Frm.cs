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
    public partial class Hostel_Student_Analysis_Details_Frm : Form
    {
        string query,Accomm="Hostel";
        int last = 0;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Hostel_Student_Analysis_Details_Frm()
        {
            InitializeComponent();
        }
       
        private void Hostel_Student_Analysis_Details_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                fill_Class_CBox();
                fill_AYear_CBox();
                fill_Main_Type_CBox();
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
                query = "select distinct(Section) from Section_Master_Table where Class='" + Class_CBox.Text + "'";
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

        public void fill_Main_Type_CBox()
        {
            try
            {
                Maintance_Type_CBox.Items.Clear();
                query = "select distinct(Main_Type) from Maintance_Type_Master_Table";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Maintance_Type_CBox.Items.Add(dr["Main_Type"].ToString());
                }
                con.Close();
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

        private void Class_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            fill_Section_CBox();
        }

        private void Hostel_Student_Analysis_Details_dataGridView1_CellValueNeeded(object sender, DataGridViewCellValueEventArgs e)
        {
            if (e.RowIndex >= 0 && e.ColumnIndex == 0)
            {
                e.Value = e.RowIndex + 1;
            }
        }

        public void ALFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Accomm_Type='"+Accomm+"' and SMonth='" + SMonth_CBox.Text + "' and Main_Type='" + Maintance_Type_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Hostel_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }       

        public void ACSMFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Accomm_Type='"+Accomm+"' and SMonth='" + SMonth_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Hostel_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACSFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Accomm_Type='"+Accomm+"' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Hostel_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Accomm_Type='"+Accomm+"' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Hostel_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACMTFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Accomm_Type='" + Accomm + "' and SMonth='" + SMonth_CBox.Text + "' and Main_Type='" + Maintance_Type_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Hostel_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void AFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Accomm_Type='"+Accomm+"' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Hostel_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
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
                query = "select * from Student_Admission_Master_Table where Class='" + Class_CBox.Text + "' and Accomm_Type='"+Accomm+"' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Hostel_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
        public void CSFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Accomm_Type='"+Accomm+"' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Hostel_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
        public void MFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where Accomm_Type='"+Accomm+"' and SMonth='" + SMonth_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Hostel_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
        
        public void TFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where Accomm_Type='"+Accomm+"' and Main_Type='" + Maintance_Type_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Hostel_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void AMFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Accomm_Type='"+Accomm+"' and SMonth='" + SMonth_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Hostel_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
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
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Accomm_Type='"+Accomm+"' and Main_Type='" + Maintance_Type_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Hostel_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }        

        public void AMTFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and SMonth='" + SMonth_CBox.Text + "' and Accomm_Type='"+Accomm+"' and Main_Type='" + Maintance_Type_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Hostel_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
        
        public void ACMFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='"+Class_CBox.Text+"' and SMonth='" + SMonth_CBox.Text + "' and Accomm_Type='" + Accomm + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Hostel_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACTFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='"+Class_CBox.Text+"' and Accomm_Type='" + Accomm + "' and Main_Type='" + Maintance_Type_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Hostel_Student_Analysis_Details_dataGridView1.DataSource = dt;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Hostel_Student_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Hostel_Student_Analysis_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void PALFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Accomm_Type='" + Accomm + "' and SMonth='" + SMonth_CBox.Text + "' and Main_Type='" + Maintance_Type_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                ReportDocument crReportDocument;
                crReportDocument = new ReportDocument();
                crReportDocument = obj;
                obj.Refresh();

                System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                crReportDocument.PrintToPrinter(1, true, 0, 0);

                MessageBox.Show("Report Printed.", "Message");
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void PACSMFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Accomm_Type='" + Accomm + "' and SMonth='" + SMonth_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                ReportDocument crReportDocument;
                crReportDocument = new ReportDocument();
                crReportDocument = obj;
                obj.Refresh();

                System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                crReportDocument.PrintToPrinter(1, true, 0, 0);

                MessageBox.Show("Report Printed.", "Message");
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void PACSFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Accomm_Type='" + Accomm + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                ReportDocument crReportDocument;
                crReportDocument = new ReportDocument();
                crReportDocument = obj;
                obj.Refresh();

                System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                crReportDocument.PrintToPrinter(1, true, 0, 0);

                MessageBox.Show("Report Printed.", "Message");
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void PACFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Accomm_Type='" + Accomm + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                ReportDocument crReportDocument;
                crReportDocument = new ReportDocument();
                crReportDocument = obj;
                obj.Refresh();

                System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                crReportDocument.PrintToPrinter(1, true, 0, 0);

                MessageBox.Show("Report Printed.", "Message");
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void PACMTFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Accomm_Type='" + Accomm + "' and SMonth='" + SMonth_CBox.Text + "' and Main_Type='" + Maintance_Type_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                ReportDocument crReportDocument;
                crReportDocument = new ReportDocument();
                crReportDocument = obj;
                obj.Refresh();

                System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                crReportDocument.PrintToPrinter(1, true, 0, 0);

                MessageBox.Show("Report Printed.", "Message");
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void PAFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Accomm_Type='" + Accomm + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                ReportDocument crReportDocument;
                crReportDocument = new ReportDocument();
                crReportDocument = obj;
                obj.Refresh();

                System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                crReportDocument.PrintToPrinter(1, true, 0, 0);

                MessageBox.Show("Report Printed.", "Message");
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void PCFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where Class='" + Class_CBox.Text + "' and Accomm_Type='" + Accomm + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                ReportDocument crReportDocument;
                crReportDocument = new ReportDocument();
                crReportDocument = obj;
                obj.Refresh();

                System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                crReportDocument.PrintToPrinter(1, true, 0, 0);

                MessageBox.Show("Report Printed.", "Message");
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
        public void PCSFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Accomm_Type='" + Accomm + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                ReportDocument crReportDocument;
                crReportDocument = new ReportDocument();
                crReportDocument = obj;
                obj.Refresh();

                System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                crReportDocument.PrintToPrinter(1, true, 0, 0);

                MessageBox.Show("Report Printed.", "Message");
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
        public void PMFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where Accomm_Type='" + Accomm + "' and SMonth='" + SMonth_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                ReportDocument crReportDocument;
                crReportDocument = new ReportDocument();
                crReportDocument = obj;
                obj.Refresh();

                System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                crReportDocument.PrintToPrinter(1, true, 0, 0);

                MessageBox.Show("Report Printed.", "Message");
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void PTFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where Accomm_Type='" + Accomm + "' and Main_Type='" + Maintance_Type_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                ReportDocument crReportDocument;
                crReportDocument = new ReportDocument();
                crReportDocument = obj;
                obj.Refresh();

                System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                crReportDocument.PrintToPrinter(1, true, 0, 0);

                MessageBox.Show("Report Printed.", "Message");
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void PAMFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Accomm_Type='" + Accomm + "' and SMonth='" + SMonth_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                ReportDocument crReportDocument;
                crReportDocument = new ReportDocument();
                crReportDocument = obj;
                obj.Refresh();

                System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                crReportDocument.PrintToPrinter(1, true, 0, 0);

                MessageBox.Show("Report Printed.", "Message");
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void PATFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Accomm_Type='" + Accomm + "' and Main_Type='" + Maintance_Type_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                ReportDocument crReportDocument;
                crReportDocument = new ReportDocument();
                crReportDocument = obj;
                obj.Refresh();

                System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                crReportDocument.PrintToPrinter(1, true, 0, 0);

                MessageBox.Show("Report Printed.", "Message");
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void PAMTFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and SMonth='" + SMonth_CBox.Text + "' and Accomm_Type='" + Accomm + "' and Main_Type='" + Maintance_Type_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                ReportDocument crReportDocument;
                crReportDocument = new ReportDocument();
                crReportDocument = obj;
                obj.Refresh();

                System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                crReportDocument.PrintToPrinter(1, true, 0, 0);

                MessageBox.Show("Report Printed.", "Message");
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void PACMFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and SMonth='" + SMonth_CBox.Text + "' and Accomm_Type='" + Accomm + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                ReportDocument crReportDocument;
                crReportDocument = new ReportDocument();
                crReportDocument = obj;
                obj.Refresh();

                System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                crReportDocument.PrintToPrinter(1, true, 0, 0);

                MessageBox.Show("Report Printed.", "Message");
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void PACTFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Accomm_Type='" + Accomm + "' and Main_Type='" + Maintance_Type_CBox.Text + "' order by Class,Section,Gender Asc";
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(query, con);
                con.Open();
                da.Fill(ds, "Student_Admission_Master_Table");
                con.Close();
                CrystalReportAMCR obj = new CrystalReportAMCR();
                obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                ReportDocument crReportDocument;
                crReportDocument = new ReportDocument();
                crReportDocument = obj;
                obj.Refresh();

                System.Drawing.Printing.PrintDocument printDocument = new System.Drawing.Printing.PrintDocument();
                crReportDocument.PrintOptions.PrinterName = printDocument.PrinterSettings.PrinterName;
                crReportDocument.PrintToPrinter(1, true, 0, 0);

                MessageBox.Show("Report Printed.", "Message");
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
                if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && SMonth_CHBox.Checked == true && Main_Type_CHBox.Checked == true)
                {
                    ALFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && SMonth_CHBox.Checked == true && Main_Type_CHBox.Checked == false)
                {
                    ACSMFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && SMonth_CHBox.Checked == false && Main_Type_CHBox.Checked == false)
                {
                    ACSFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Main_Type_CHBox.Checked == false)
                {
                    ACFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && SMonth_CHBox.Checked == true && Main_Type_CHBox.Checked == true)
                {
                    ACFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && SMonth_CHBox.Checked == true && Main_Type_CHBox.Checked == true)
                {
                    ACMTFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && SMonth_CHBox.Checked == true && Main_Type_CHBox.Checked == false)
                {
                    ACMFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Main_Type_CHBox.Checked == true)
                {
                    ACTFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false&& Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Main_Type_CHBox.Checked == false)
                {
                    AFill_Grid();
                    SYear_CBox.Focus();
                }               
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == true && Main_Type_CHBox.Checked == false)
                {
                    AMFill_Grid();
                    SYear_CBox.Focus();
                }                
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Main_Type_CHBox.Checked == true)
                {
                    ATFill_Grid();
                    SYear_CBox.Focus();
                }             
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == true && Main_Type_CHBox.Checked == true)
                {
                    AMTFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == false && Class_CHBox.Checked == true && Section_CHBox.Checked == true && SMonth_CHBox.Checked == false && Main_Type_CHBox.Checked == false)
                {
                    CSFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == false && Class_CHBox.Checked == true && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Main_Type_CHBox.Checked == false)
                {
                    CFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == false && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == true && Main_Type_CHBox.Checked == false)
                {
                    MFill_Grid();
                    SYear_CBox.Focus();
                }                
                else if (AYear_CHBox.Checked == false && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Main_Type_CHBox.Checked == true)
                {
                    TFill_Grid();
                    SYear_CBox.Focus();
                }
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

        private void Print_Lbl_Click(object sender, EventArgs e)
        {
            try
            {
                if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && SMonth_CHBox.Checked == true && Main_Type_CHBox.Checked == true)
                {
                    PALFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && SMonth_CHBox.Checked == true && Main_Type_CHBox.Checked == false)
                {
                    PACSMFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && SMonth_CHBox.Checked == false && Main_Type_CHBox.Checked == false)
                {
                    PACSFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Main_Type_CHBox.Checked == false)
                {
                    PACFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && SMonth_CHBox.Checked == true && Main_Type_CHBox.Checked == true)
                {
                    PACFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && SMonth_CHBox.Checked == true && Main_Type_CHBox.Checked == true)
                {
                    PACMTFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && SMonth_CHBox.Checked == true && Main_Type_CHBox.Checked == false)
                {
                    PACMFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Main_Type_CHBox.Checked == true)
                {
                    PACTFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Main_Type_CHBox.Checked == false)
                {
                    PAFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == true && Main_Type_CHBox.Checked == false)
                {
                    PAMFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Main_Type_CHBox.Checked == true)
                {
                    PATFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == true && Main_Type_CHBox.Checked == true)
                {
                    PAMTFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == false && Class_CHBox.Checked == true && Section_CHBox.Checked == true && SMonth_CHBox.Checked == false && Main_Type_CHBox.Checked == false)
                {
                    PCSFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == false && Class_CHBox.Checked == true && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Main_Type_CHBox.Checked == false)
                {
                    PCFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == false && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == true && Main_Type_CHBox.Checked == false)
                {
                    PMFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == false && Class_CHBox.Checked == false && Section_CHBox.Checked == false && SMonth_CHBox.Checked == false && Main_Type_CHBox.Checked == true)
                {
                    PTFill_Grid();
                    SYear_CBox.Focus();
                }
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }       
    }
}
