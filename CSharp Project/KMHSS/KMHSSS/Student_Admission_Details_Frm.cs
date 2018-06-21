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
    public partial class Student_Admission_Details_Frm : Form
    {
        string query, Accommh = "Hostel", Van = "YES", Accommd = "DAYS SCHOLAR";
        int last = 0;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Student_Admission_Details_Frm()
        {
            InitializeComponent();
        }

        private void Student_Admission_Details_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                Frm_Admis_Date_Dtp.Value = DateTime.Now;
                To_Admis_Date_Dtp.Value = DateTime.Now;
                fill_Class_CBox();
                fill_AYear_CBox();
                SYear_CBox.Focus();
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

        public void ACSFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Admission_dataGridView1.DataSource = dt;
                Student_Admission_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Admission_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Admission_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Admission_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Admission_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Admission_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Admission_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Admission_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Admission_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Admission_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Admission_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Admission_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Admission_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Admission_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Admission_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Admission_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Admission_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Admission_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Admission_dataGridView1.Columns[1].Width = 120;
                Student_Admission_dataGridView1.Columns[2].Width = 120;
                Student_Admission_dataGridView1.Columns[3].Width = 350;
                Student_Admission_dataGridView1.Columns[4].Width = 120;
                Student_Admission_dataGridView1.Columns[5].Width = 120;
                Student_Admission_dataGridView1.Columns[6].Width = 120;
                Student_Admission_dataGridView1.Columns[7].Width = 120;
                Student_Admission_dataGridView1.Columns[8].Width = 150;
                Student_Admission_dataGridView1.Columns[9].Width = 330;
                Student_Admission_dataGridView1.Columns[10].Width = 120;
                Student_Admission_dataGridView1.Columns[11].Width = 200;
                Student_Admission_dataGridView1.Columns[12].Width = 150;
                Student_Admission_dataGridView1.Columns[13].Width = 330;
                Student_Admission_dataGridView1.Columns[14].Width = 150;
                Student_Admission_dataGridView1.Columns[15].Width = 150;
                Student_Admission_dataGridView1.Columns[16].Width = 150;
                Student_Admission_dataGridView1.Columns[17].Width = 120;
                Student_Admission_dataGridView1.Columns[18].Width = 120;
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
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Admission_dataGridView1.DataSource = dt;
                Student_Admission_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Admission_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Admission_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Admission_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Admission_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Admission_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Admission_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Admission_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Admission_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Admission_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Admission_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Admission_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Admission_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Admission_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Admission_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Admission_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Admission_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Admission_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Admission_dataGridView1.Columns[1].Width = 120;
                Student_Admission_dataGridView1.Columns[2].Width = 120;
                Student_Admission_dataGridView1.Columns[3].Width = 350;
                Student_Admission_dataGridView1.Columns[4].Width = 120;
                Student_Admission_dataGridView1.Columns[5].Width = 120;
                Student_Admission_dataGridView1.Columns[6].Width = 120;
                Student_Admission_dataGridView1.Columns[7].Width = 120;
                Student_Admission_dataGridView1.Columns[8].Width = 150;
                Student_Admission_dataGridView1.Columns[9].Width = 330;
                Student_Admission_dataGridView1.Columns[10].Width = 120;
                Student_Admission_dataGridView1.Columns[11].Width = 200;
                Student_Admission_dataGridView1.Columns[12].Width = 150;
                Student_Admission_dataGridView1.Columns[13].Width = 330;
                Student_Admission_dataGridView1.Columns[14].Width = 150;
                Student_Admission_dataGridView1.Columns[15].Width = 150;
                Student_Admission_dataGridView1.Columns[16].Width = 150;
                Student_Admission_dataGridView1.Columns[17].Width = 120;
                Student_Admission_dataGridView1.Columns[18].Width = 120;
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
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Admission_dataGridView1.DataSource = dt;
                Student_Admission_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Admission_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Admission_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Admission_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Admission_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Admission_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Admission_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Admission_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Admission_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Admission_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Admission_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Admission_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Admission_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Admission_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Admission_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Admission_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Admission_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Admission_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Admission_dataGridView1.Columns[1].Width = 120;
                Student_Admission_dataGridView1.Columns[2].Width = 120;
                Student_Admission_dataGridView1.Columns[3].Width = 350;
                Student_Admission_dataGridView1.Columns[4].Width = 120;
                Student_Admission_dataGridView1.Columns[5].Width = 120;
                Student_Admission_dataGridView1.Columns[6].Width = 120;
                Student_Admission_dataGridView1.Columns[7].Width = 120;
                Student_Admission_dataGridView1.Columns[8].Width = 150;
                Student_Admission_dataGridView1.Columns[9].Width = 330;
                Student_Admission_dataGridView1.Columns[10].Width = 120;
                Student_Admission_dataGridView1.Columns[11].Width = 200;
                Student_Admission_dataGridView1.Columns[12].Width = 150;
                Student_Admission_dataGridView1.Columns[13].Width = 330;
                Student_Admission_dataGridView1.Columns[14].Width = 150;
                Student_Admission_dataGridView1.Columns[15].Width = 150;
                Student_Admission_dataGridView1.Columns[16].Width = 150;
                Student_Admission_dataGridView1.Columns[17].Width = 120;
                Student_Admission_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        } 

        public void ACSDTFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Admis_Date between '" + Frm_Admis_Date_Dtp.Text + "' and '" + To_Admis_Date_Dtp.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Admission_dataGridView1.DataSource = dt;
                Student_Admission_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Admission_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Admission_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Admission_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Admission_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Admission_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Admission_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Admission_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Admission_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Admission_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Admission_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Admission_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Admission_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Admission_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Admission_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Admission_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Admission_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Admission_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Admission_dataGridView1.Columns[1].Width = 120;
                Student_Admission_dataGridView1.Columns[2].Width = 120;
                Student_Admission_dataGridView1.Columns[3].Width = 350;
                Student_Admission_dataGridView1.Columns[4].Width = 120;
                Student_Admission_dataGridView1.Columns[5].Width = 120;
                Student_Admission_dataGridView1.Columns[6].Width = 120;
                Student_Admission_dataGridView1.Columns[7].Width = 120;
                Student_Admission_dataGridView1.Columns[8].Width = 150;
                Student_Admission_dataGridView1.Columns[9].Width = 330;
                Student_Admission_dataGridView1.Columns[10].Width = 120;
                Student_Admission_dataGridView1.Columns[11].Width = 200;
                Student_Admission_dataGridView1.Columns[12].Width = 150;
                Student_Admission_dataGridView1.Columns[13].Width = 330;
                Student_Admission_dataGridView1.Columns[14].Width = 150;
                Student_Admission_dataGridView1.Columns[15].Width = 150;
                Student_Admission_dataGridView1.Columns[16].Width = 150;
                Student_Admission_dataGridView1.Columns[17].Width = 120;
                Student_Admission_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }        

        public void ADTFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Admis_Date between '" + Frm_Admis_Date_Dtp.Text + "' and '" + To_Admis_Date_Dtp.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Admission_dataGridView1.DataSource = dt;
                Student_Admission_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Admission_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Admission_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Admission_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Admission_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Admission_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Admission_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Admission_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Admission_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Admission_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Admission_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Admission_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Admission_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Admission_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Admission_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Admission_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Admission_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Admission_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Admission_dataGridView1.Columns[1].Width = 120;
                Student_Admission_dataGridView1.Columns[2].Width = 120;
                Student_Admission_dataGridView1.Columns[3].Width = 350;
                Student_Admission_dataGridView1.Columns[4].Width = 120;
                Student_Admission_dataGridView1.Columns[5].Width = 120;
                Student_Admission_dataGridView1.Columns[6].Width = 120;
                Student_Admission_dataGridView1.Columns[7].Width = 120;
                Student_Admission_dataGridView1.Columns[8].Width = 150;
                Student_Admission_dataGridView1.Columns[9].Width = 330;
                Student_Admission_dataGridView1.Columns[10].Width = 120;
                Student_Admission_dataGridView1.Columns[11].Width = 200;
                Student_Admission_dataGridView1.Columns[12].Width = 150;
                Student_Admission_dataGridView1.Columns[13].Width = 330;
                Student_Admission_dataGridView1.Columns[14].Width = 150;
                Student_Admission_dataGridView1.Columns[15].Width = 150;
                Student_Admission_dataGridView1.Columns[16].Width = 150;
                Student_Admission_dataGridView1.Columns[17].Width = 120;
                Student_Admission_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ADFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Accomm_Type='" + Accommd + "' and Van!='" + Van + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Admission_dataGridView1.DataSource = dt;
                Student_Admission_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Admission_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Admission_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Admission_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Admission_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Admission_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Admission_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Admission_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Admission_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Admission_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Admission_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Admission_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Admission_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Admission_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Admission_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Admission_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Admission_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Admission_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Admission_dataGridView1.Columns[1].Width = 120;
                Student_Admission_dataGridView1.Columns[2].Width = 120;
                Student_Admission_dataGridView1.Columns[3].Width = 350;
                Student_Admission_dataGridView1.Columns[4].Width = 120;
                Student_Admission_dataGridView1.Columns[5].Width = 120;
                Student_Admission_dataGridView1.Columns[6].Width = 120;
                Student_Admission_dataGridView1.Columns[7].Width = 120;
                Student_Admission_dataGridView1.Columns[8].Width = 150;
                Student_Admission_dataGridView1.Columns[9].Width = 330;
                Student_Admission_dataGridView1.Columns[10].Width = 120;
                Student_Admission_dataGridView1.Columns[11].Width = 200;
                Student_Admission_dataGridView1.Columns[12].Width = 150;
                Student_Admission_dataGridView1.Columns[13].Width = 330;
                Student_Admission_dataGridView1.Columns[14].Width = 150;
                Student_Admission_dataGridView1.Columns[15].Width = 150;
                Student_Admission_dataGridView1.Columns[16].Width = 150;
                Student_Admission_dataGridView1.Columns[17].Width = 120;
                Student_Admission_dataGridView1.Columns[18].Width = 120;
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
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Accomm_Type='" + Accommh + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Admission_dataGridView1.DataSource = dt;
                Student_Admission_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Admission_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Admission_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Admission_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Admission_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Admission_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Admission_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Admission_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Admission_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Admission_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Admission_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Admission_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Admission_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Admission_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Admission_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Admission_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Admission_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Admission_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Admission_dataGridView1.Columns[1].Width = 120;
                Student_Admission_dataGridView1.Columns[2].Width = 120;
                Student_Admission_dataGridView1.Columns[3].Width = 350;
                Student_Admission_dataGridView1.Columns[4].Width = 120;
                Student_Admission_dataGridView1.Columns[5].Width = 120;
                Student_Admission_dataGridView1.Columns[6].Width = 120;
                Student_Admission_dataGridView1.Columns[7].Width = 120;
                Student_Admission_dataGridView1.Columns[8].Width = 150;
                Student_Admission_dataGridView1.Columns[9].Width = 330;
                Student_Admission_dataGridView1.Columns[10].Width = 120;
                Student_Admission_dataGridView1.Columns[11].Width = 200;
                Student_Admission_dataGridView1.Columns[12].Width = 150;
                Student_Admission_dataGridView1.Columns[13].Width = 330;
                Student_Admission_dataGridView1.Columns[14].Width = 150;
                Student_Admission_dataGridView1.Columns[15].Width = 150;
                Student_Admission_dataGridView1.Columns[16].Width = 150;
                Student_Admission_dataGridView1.Columns[17].Width = 120;
                Student_Admission_dataGridView1.Columns[18].Width = 120;
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
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Admission_dataGridView1.DataSource = dt;
                Student_Admission_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Admission_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Admission_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Admission_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Admission_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Admission_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Admission_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Admission_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Admission_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Admission_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Admission_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Admission_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Admission_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Admission_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Admission_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Admission_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Admission_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Admission_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Admission_dataGridView1.Columns[1].Width = 120;
                Student_Admission_dataGridView1.Columns[2].Width = 120;
                Student_Admission_dataGridView1.Columns[3].Width = 350;
                Student_Admission_dataGridView1.Columns[4].Width = 120;
                Student_Admission_dataGridView1.Columns[5].Width = 120;
                Student_Admission_dataGridView1.Columns[6].Width = 120;
                Student_Admission_dataGridView1.Columns[7].Width = 120;
                Student_Admission_dataGridView1.Columns[8].Width = 150;
                Student_Admission_dataGridView1.Columns[9].Width = 330;
                Student_Admission_dataGridView1.Columns[10].Width = 120;
                Student_Admission_dataGridView1.Columns[11].Width = 200;
                Student_Admission_dataGridView1.Columns[12].Width = 150;
                Student_Admission_dataGridView1.Columns[13].Width = 330;
                Student_Admission_dataGridView1.Columns[14].Width = 150;
                Student_Admission_dataGridView1.Columns[15].Width = 150;
                Student_Admission_dataGridView1.Columns[16].Width = 150;
                Student_Admission_dataGridView1.Columns[17].Width = 120;
                Student_Admission_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACSDFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Accomm_Type='" + Accommd + "' and Van!='" + Van + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Admission_dataGridView1.DataSource = dt;
                Student_Admission_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Admission_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Admission_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Admission_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Admission_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Admission_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Admission_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Admission_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Admission_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Admission_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Admission_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Admission_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Admission_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Admission_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Admission_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Admission_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Admission_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Admission_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Admission_dataGridView1.Columns[1].Width = 120;
                Student_Admission_dataGridView1.Columns[2].Width = 120;
                Student_Admission_dataGridView1.Columns[3].Width = 350;
                Student_Admission_dataGridView1.Columns[4].Width = 120;
                Student_Admission_dataGridView1.Columns[5].Width = 120;
                Student_Admission_dataGridView1.Columns[6].Width = 120;
                Student_Admission_dataGridView1.Columns[7].Width = 120;
                Student_Admission_dataGridView1.Columns[8].Width = 150;
                Student_Admission_dataGridView1.Columns[9].Width = 330;
                Student_Admission_dataGridView1.Columns[10].Width = 120;
                Student_Admission_dataGridView1.Columns[11].Width = 200;
                Student_Admission_dataGridView1.Columns[12].Width = 150;
                Student_Admission_dataGridView1.Columns[13].Width = 330;
                Student_Admission_dataGridView1.Columns[14].Width = 150;
                Student_Admission_dataGridView1.Columns[15].Width = 150;
                Student_Admission_dataGridView1.Columns[16].Width = 150;
                Student_Admission_dataGridView1.Columns[17].Width = 120;
                Student_Admission_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACSHFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Accomm_Type='" + Accommh + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Admission_dataGridView1.DataSource = dt;
                Student_Admission_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Admission_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Admission_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Admission_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Admission_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Admission_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Admission_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Admission_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Admission_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Admission_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Admission_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Admission_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Admission_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Admission_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Admission_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Admission_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Admission_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Admission_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Admission_dataGridView1.Columns[1].Width = 120;
                Student_Admission_dataGridView1.Columns[2].Width = 120;
                Student_Admission_dataGridView1.Columns[3].Width = 350;
                Student_Admission_dataGridView1.Columns[4].Width = 120;
                Student_Admission_dataGridView1.Columns[5].Width = 120;
                Student_Admission_dataGridView1.Columns[6].Width = 120;
                Student_Admission_dataGridView1.Columns[7].Width = 120;
                Student_Admission_dataGridView1.Columns[8].Width = 150;
                Student_Admission_dataGridView1.Columns[9].Width = 330;
                Student_Admission_dataGridView1.Columns[10].Width = 120;
                Student_Admission_dataGridView1.Columns[11].Width = 200;
                Student_Admission_dataGridView1.Columns[12].Width = 150;
                Student_Admission_dataGridView1.Columns[13].Width = 330;
                Student_Admission_dataGridView1.Columns[14].Width = 150;
                Student_Admission_dataGridView1.Columns[15].Width = 150;
                Student_Admission_dataGridView1.Columns[16].Width = 150;
                Student_Admission_dataGridView1.Columns[17].Width = 120;
                Student_Admission_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACSVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Van='" + Van + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Admission_dataGridView1.DataSource = dt;
                Student_Admission_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Admission_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Admission_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Admission_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Admission_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Admission_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Admission_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Admission_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Admission_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Admission_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Admission_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Admission_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Admission_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Admission_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Admission_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Admission_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Admission_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Admission_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Admission_dataGridView1.Columns[1].Width = 120;
                Student_Admission_dataGridView1.Columns[2].Width = 120;
                Student_Admission_dataGridView1.Columns[3].Width = 350;
                Student_Admission_dataGridView1.Columns[4].Width = 120;
                Student_Admission_dataGridView1.Columns[5].Width = 120;
                Student_Admission_dataGridView1.Columns[6].Width = 120;
                Student_Admission_dataGridView1.Columns[7].Width = 120;
                Student_Admission_dataGridView1.Columns[8].Width = 150;
                Student_Admission_dataGridView1.Columns[9].Width = 330;
                Student_Admission_dataGridView1.Columns[10].Width = 120;
                Student_Admission_dataGridView1.Columns[11].Width = 200;
                Student_Admission_dataGridView1.Columns[12].Width = 150;
                Student_Admission_dataGridView1.Columns[13].Width = 330;
                Student_Admission_dataGridView1.Columns[14].Width = 150;
                Student_Admission_dataGridView1.Columns[15].Width = 150;
                Student_Admission_dataGridView1.Columns[16].Width = 150;
                Student_Admission_dataGridView1.Columns[17].Width = 120;
                Student_Admission_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACDFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Accomm_Type='" + Accommd + "' and Van!='" + Van + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Admission_dataGridView1.DataSource = dt;
                Student_Admission_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Admission_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Admission_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Admission_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Admission_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Admission_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Admission_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Admission_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Admission_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Admission_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Admission_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Admission_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Admission_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Admission_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Admission_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Admission_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Admission_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Admission_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Admission_dataGridView1.Columns[1].Width = 120;
                Student_Admission_dataGridView1.Columns[2].Width = 120;
                Student_Admission_dataGridView1.Columns[3].Width = 350;
                Student_Admission_dataGridView1.Columns[4].Width = 120;
                Student_Admission_dataGridView1.Columns[5].Width = 120;
                Student_Admission_dataGridView1.Columns[6].Width = 120;
                Student_Admission_dataGridView1.Columns[7].Width = 120;
                Student_Admission_dataGridView1.Columns[8].Width = 150;
                Student_Admission_dataGridView1.Columns[9].Width = 330;
                Student_Admission_dataGridView1.Columns[10].Width = 120;
                Student_Admission_dataGridView1.Columns[11].Width = 200;
                Student_Admission_dataGridView1.Columns[12].Width = 150;
                Student_Admission_dataGridView1.Columns[13].Width = 330;
                Student_Admission_dataGridView1.Columns[14].Width = 150;
                Student_Admission_dataGridView1.Columns[15].Width = 150;
                Student_Admission_dataGridView1.Columns[16].Width = 150;
                Student_Admission_dataGridView1.Columns[17].Width = 120;
                Student_Admission_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACHFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Accomm_Type='" + Accommh + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Admission_dataGridView1.DataSource = dt;
                Student_Admission_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Admission_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Admission_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Admission_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Admission_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Admission_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Admission_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Admission_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Admission_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Admission_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Admission_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Admission_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Admission_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Admission_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Admission_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Admission_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Admission_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Admission_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Admission_dataGridView1.Columns[1].Width = 120;
                Student_Admission_dataGridView1.Columns[2].Width = 120;
                Student_Admission_dataGridView1.Columns[3].Width = 350;
                Student_Admission_dataGridView1.Columns[4].Width = 120;
                Student_Admission_dataGridView1.Columns[5].Width = 120;
                Student_Admission_dataGridView1.Columns[6].Width = 120;
                Student_Admission_dataGridView1.Columns[7].Width = 120;
                Student_Admission_dataGridView1.Columns[8].Width = 150;
                Student_Admission_dataGridView1.Columns[9].Width = 330;
                Student_Admission_dataGridView1.Columns[10].Width = 120;
                Student_Admission_dataGridView1.Columns[11].Width = 200;
                Student_Admission_dataGridView1.Columns[12].Width = 150;
                Student_Admission_dataGridView1.Columns[13].Width = 330;
                Student_Admission_dataGridView1.Columns[14].Width = 150;
                Student_Admission_dataGridView1.Columns[15].Width = 150;
                Student_Admission_dataGridView1.Columns[16].Width = 150;
                Student_Admission_dataGridView1.Columns[17].Width = 120;
                Student_Admission_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Van='" + Van + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Admission_dataGridView1.DataSource = dt;
                Student_Admission_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Admission_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Admission_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Admission_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Admission_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Admission_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Admission_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Admission_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Admission_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Admission_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Admission_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Admission_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Admission_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Admission_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Admission_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Admission_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Admission_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Admission_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Admission_dataGridView1.Columns[1].Width = 120;
                Student_Admission_dataGridView1.Columns[2].Width = 120;
                Student_Admission_dataGridView1.Columns[3].Width = 350;
                Student_Admission_dataGridView1.Columns[4].Width = 120;
                Student_Admission_dataGridView1.Columns[5].Width = 120;
                Student_Admission_dataGridView1.Columns[6].Width = 120;
                Student_Admission_dataGridView1.Columns[7].Width = 120;
                Student_Admission_dataGridView1.Columns[8].Width = 150;
                Student_Admission_dataGridView1.Columns[9].Width = 330;
                Student_Admission_dataGridView1.Columns[10].Width = 120;
                Student_Admission_dataGridView1.Columns[11].Width = 200;
                Student_Admission_dataGridView1.Columns[12].Width = 150;
                Student_Admission_dataGridView1.Columns[13].Width = 330;
                Student_Admission_dataGridView1.Columns[14].Width = 150;
                Student_Admission_dataGridView1.Columns[15].Width = 150;
                Student_Admission_dataGridView1.Columns[16].Width = 150;
                Student_Admission_dataGridView1.Columns[17].Width = 120;
                Student_Admission_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACDTFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Admis_Date between '" + Frm_Admis_Date_Dtp.Text + "' and '" + To_Admis_Date_Dtp.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Admission_dataGridView1.DataSource = dt;
                Student_Admission_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Admission_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Admission_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Admission_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Admission_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Admission_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Admission_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Admission_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Admission_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Admission_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Admission_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Admission_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Admission_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Admission_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Admission_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Admission_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Admission_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Admission_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Admission_dataGridView1.Columns[1].Width = 120;
                Student_Admission_dataGridView1.Columns[2].Width = 120;
                Student_Admission_dataGridView1.Columns[3].Width = 350;
                Student_Admission_dataGridView1.Columns[4].Width = 120;
                Student_Admission_dataGridView1.Columns[5].Width = 120;
                Student_Admission_dataGridView1.Columns[6].Width = 120;
                Student_Admission_dataGridView1.Columns[7].Width = 120;
                Student_Admission_dataGridView1.Columns[8].Width = 150;
                Student_Admission_dataGridView1.Columns[9].Width = 330;
                Student_Admission_dataGridView1.Columns[10].Width = 120;
                Student_Admission_dataGridView1.Columns[11].Width = 200;
                Student_Admission_dataGridView1.Columns[12].Width = 150;
                Student_Admission_dataGridView1.Columns[13].Width = 330;
                Student_Admission_dataGridView1.Columns[14].Width = 150;
                Student_Admission_dataGridView1.Columns[15].Width = 150;
                Student_Admission_dataGridView1.Columns[16].Width = 150;
                Student_Admission_dataGridView1.Columns[17].Width = 120;
                Student_Admission_dataGridView1.Columns[18].Width = 120;
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
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' order by Class,Section,Gender Asc";
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
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' order by Class,Section,Gender Asc";
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
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' order by Class,Section,Gender Asc";
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

        public void PACSDTFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Admis_Date between '" + Frm_Admis_Date_Dtp.Text + "' and '" + To_Admis_Date_Dtp.Text + "' order by Class,Section,Gender Asc";
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

        

        public void PADTFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Admis_Date between '" + Frm_Admis_Date_Dtp.Text + "' and '" + To_Admis_Date_Dtp.Text + "' order by Class,Section,Gender Asc";
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

        public void PADFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Accomm_Type='" + Accommd + "' and Van!='" + Van + "' order by Class,Section,Gender Asc";
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

        public void PAHFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Accomm_Type='" + Accommh + "' order by Class,Section,Gender Asc";
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

        public void PAVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Van='" + Van + "' order by Class,Section,Gender Asc";
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

        public void PACSDFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Accomm_Type='" + Accommd + "' and Van!='" + Van + "' order by Class,Section,Gender Asc";
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

        public void PACSHFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Accomm_Type='" + Accommh + "' order by Class,Section,Gender Asc";
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

        public void PACSVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Van='" + Van + "' order by Class,Section,Gender Asc";
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

        public void PACDFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Accomm_Type='" + Accommd + "' and Van!='" + Van + "' order by Class,Section,Gender Asc";
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

        public void PACHFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Accomm_Type='" + Accommh + "' order by Class,Section,Gender Asc";
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

        public void PACVFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Van='" + Van + "' order by Class,Section,Gender Asc";
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

        public void PACDTFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Admis_Date between '" + Frm_Admis_Date_Dtp.Text + "' and '" + To_Admis_Date_Dtp.Text + "' order by Class,Section,Gender Asc";
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
        
        private void Frm_Admis_Date_Dtp_KeyDown(object sender, KeyEventArgs e)
        {
            if (Frm_Admis_Date_Dtp.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    To_Admis_Date_Dtp.Focus();
                }
            }
        }

        private void To_Admis_Date_Dtp_KeyDown(object sender, KeyEventArgs e)
        {
            if (To_Admis_Date_Dtp.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    View_Btn.Focus();
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
        }

        private void Class_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            fill_Section_CBox();
        }

        private void AYear_CHBox_CheckedChanged(object sender, EventArgs e)
        {
            SYear_CBox.Focus();
        }

        private void Class_CHBox_CheckedChanged(object sender, EventArgs e)
        {
            Class_CBox.Focus();
        }

        private void Section_CHBox_CheckedChanged(object sender, EventArgs e)
        {
            Sec_CBox.Focus();
        }

        private void Date_CHBox_CheckedChanged(object sender, EventArgs e)
        {
            Frm_Admis_Date_Dtp.Focus();
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
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        private void Class_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Class_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    View_Btn.Focus();
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        private void Close_Btn_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void View_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Hostel_CHBox.Checked==false && Van_CHBox.Checked==false && Dayscholar_CHBox.Checked==false && Date_CHBox.Checked == false)
                {
                    ACSFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == false)
                {
                    ACFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == false)
                {
                    AFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Hostel_CHBox.Checked == true && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == false)
                {
                    ACSHFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Hostel_CHBox.Checked == false && Van_CHBox.Checked == true && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == false)
                {
                    ACSVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == true && Date_CHBox.Checked == false)
                {
                    ACSDFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Hostel_CHBox.Checked == true && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == false)
                {
                    ACHFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Hostel_CHBox.Checked == false && Van_CHBox.Checked == true && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == false)
                {
                    ACVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == true && Date_CHBox.Checked == false)
                {
                    ACDFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == true)
                {
                    ACSDTFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == true)
                {
                    ACDTFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == true)
                {
                    ACDTFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == true)
                {
                    ADTFill_Grid();
                    SYear_CBox.Focus();
                }
                if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Hostel_CHBox.Checked == true && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == false)
                {
                    AHFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked ==false && Section_CHBox.Checked == false && Hostel_CHBox.Checked == false && Van_CHBox.Checked == true && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == false)
                {
                    AVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked ==true && Date_CHBox.Checked == false)
                {
                    ADFill_Grid();
                    SYear_CBox.Focus();
                }
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Student_Admission_dataGridView1_CellValueNeeded(object sender, DataGridViewCellValueEventArgs e)
        {
            if (e.RowIndex >= 0 && e.ColumnIndex == 0)
            {
                e.Value = e.RowIndex + 1;
            }
        }

        private void Print_Lbl_Click(object sender, EventArgs e)
        {
            try
            {
                if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == false)
                {
                    PACSFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == false)
                {
                    PACFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == false)
                {
                    PAFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Hostel_CHBox.Checked == true && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == false)
                {
                    PACSHFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Hostel_CHBox.Checked == false && Van_CHBox.Checked == true && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == false)
                {
                    PACSVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == true && Date_CHBox.Checked == false)
                {
                    PACSDFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == true)
                {
                    PACSDTFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Hostel_CHBox.Checked == true && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == false)
                {
                    PACHFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Hostel_CHBox.Checked == false && Van_CHBox.Checked == true && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == false)
                {
                    PACVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == true && Date_CHBox.Checked == false)
                {
                    PACDFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == true)
                {
                    PACDTFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == true)
                {
                    PACDTFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == true)
                {
                    PADTFill_Grid();
                    SYear_CBox.Focus();
                }
                if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Hostel_CHBox.Checked == true && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == false)
                {
                    PAHFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Hostel_CHBox.Checked == false && Van_CHBox.Checked == true && Dayscholar_CHBox.Checked == false && Date_CHBox.Checked == false)
                {
                    PAVFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Hostel_CHBox.Checked == false && Van_CHBox.Checked == false && Dayscholar_CHBox.Checked == true && Date_CHBox.Checked == false)
                {
                    PADFill_Grid();
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
