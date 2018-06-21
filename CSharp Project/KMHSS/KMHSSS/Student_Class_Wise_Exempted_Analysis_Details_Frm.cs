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
    public partial class Student_Class_Wise_Exempted_Analysis_Details_Frm : Form
    {
        string query,Exemp="YES";
        int last = 0;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Student_Class_Wise_Exempted_Analysis_Details_Frm()
        {
            InitializeComponent();
        }

        private void Student_Class_Wise_Exempted_Analysis_Details_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                fill_Class_CBox();
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
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.DataSource = dt;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[18].Width = 120;
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
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.DataSource = dt;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[18].Width = 120;
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
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.DataSource = dt;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACSCCFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Concession_Amt>0 order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.DataSource = dt;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACCCFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Concession_Amt>0 order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.DataSource = dt;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACCFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Concession_Amt>0 order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.DataSource = dt;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACSEFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Exemption='"+Exemp+"' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.DataSource = dt;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACEFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Exemption='" + Exemp + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.DataSource = dt;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void AEFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Exemption='" + Exemp + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.DataSource = dt;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Student_Class_Wise_Exempted_Analysis_Details_dataGridView1.Columns[18].Width = 120;
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

        public void PACSCCFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Concession_Amt>0 order by Class,Section,Gender Asc";
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

        public void PACCCFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Concession_Amt>0 order by Class,Section,Gender Asc";
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

        public void PACCFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Concession_Amt>0 order by Class,Section,Gender Asc";
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

        public void PACSEFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Exemption='" + Exemp + "' order by Class,Section,Gender Asc";
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

        public void PACEFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Exemption='" + Exemp + "' order by Class,Section,Gender Asc";
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

        public void PAEFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Exemption='" + Exemp + "' order by Class,Section,Gender Asc";
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
                if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Concession_CHBox.Checked == false && Exemption_CHBox.Checked == false)
                {
                    ACSFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Concession_CHBox.Checked == false && Exemption_CHBox.Checked == false)
                {
                    ACFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Concession_CHBox.Checked == false && Exemption_CHBox.Checked == false)
                {
                    AFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Concession_CHBox.Checked == true && Exemption_CHBox.Checked == false)
                {
                    ACSCCFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Concession_CHBox.Checked == true && Exemption_CHBox.Checked == false)
                {
                    ACCCFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Concession_CHBox.Checked == true && Exemption_CHBox.Checked == false)
                {
                    ACCFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Concession_CHBox.Checked == false && Exemption_CHBox.Checked == true)
                {
                    ACSEFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Concession_CHBox.Checked == false && Exemption_CHBox.Checked == true)
                {
                    ACEFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Concession_CHBox.Checked == false && Exemption_CHBox.Checked == true)
                {
                    AEFill_Grid();
                }                
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

        private void Student_Class_Wise_Exempted_Analysis_Details_dataGridView1_CellValueNeeded(object sender, DataGridViewCellValueEventArgs e)
        {
            if (e.RowIndex >= 0 && e.ColumnIndex == 0)
            {
                e.Value = e.RowIndex + 1;
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
                if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Concession_CHBox.Checked == false && Exemption_CHBox.Checked == false)
                {
                    PACSFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Concession_CHBox.Checked == false && Exemption_CHBox.Checked == false)
                {
                    PACFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Concession_CHBox.Checked == false && Exemption_CHBox.Checked == false)
                {
                    PAFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Concession_CHBox.Checked == true && Exemption_CHBox.Checked == false)
                {
                    PACSCCFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Concession_CHBox.Checked == true && Exemption_CHBox.Checked == false)
                {
                    PACCCFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Concession_CHBox.Checked == true && Exemption_CHBox.Checked == false)
                {
                    PACCFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Concession_CHBox.Checked == false && Exemption_CHBox.Checked == true)
                {
                    PACSEFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Concession_CHBox.Checked == false && Exemption_CHBox.Checked == true)
                {
                    PACEFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Concession_CHBox.Checked == false && Exemption_CHBox.Checked == true)
                {
                    PAEFill_Grid();
                }
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}
