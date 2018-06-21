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
    public partial class Student_Class_Wise_Extra_Analysis_Details_Frm : Form
    {
        string query;
        int last = 0;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Student_Class_Wise_Extra_Analysis_Details_Frm()
        {
            InitializeComponent();
        }       

        private void Student_Class_Wise_Extra_Analysis_Details_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                fill_Class_CBox();
                fill_AYear_CBox();
                fill_Term_CBox();
                fill_Branch_CBox();
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

        public void fill_Branch_CBox()
        {
            try
            {
                Branch_CBox.Items.Clear();
                query = "select distinct(Branch) from Group_Master_Table";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Branch_CBox.Items.Add( dr["Branch"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }       

        public void fill_Term_CBox()
        {
            try
            {
                STerms_CBox.Items.Clear();
                query = "select distinct(Term_Type) from Term_Type_Master_Table";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    STerms_CBox.Items.Add(dr["Term_Type"].ToString());
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
                query = "select * from Student_Admission_Master_Table where SYear='"+SYear_CBox.Text+"' and EYear='"+EYear_Txt.Text+"' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.DataSource = dt;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[18].Width = 120;
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
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.DataSource = dt;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[18].Width = 120;
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
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.DataSource = dt;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACSGFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Gender='"+Gender_CBox.Text+"' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.DataSource = dt;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACGFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Gender='" + Gender_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.DataSource = dt;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void AGFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Gender='" + Gender_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.DataSource = dt;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACSGCFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Branch='"+Branch_CBox.Text+"' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.DataSource = dt;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACGCFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Branch='" + Branch_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.DataSource = dt;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void AGCFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Branch='" + Branch_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.DataSource = dt;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[18].Width = 120;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACSTFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and STerm='"+STerms_CBox.Text+"' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.DataSource = dt;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[18].Width = 120;
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
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and STerm='" + STerms_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.DataSource = dt;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[18].Width = 120;
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
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and STerm='" + STerms_CBox.Text + "' order by Class,Section,Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.DataSource = dt;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[1].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[2].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[3].Width = 350;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[4].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[5].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[6].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[7].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[8].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[9].Width = 330;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[10].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[11].Width = 200;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[12].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[13].Width = 330;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[14].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[15].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[16].Width = 150;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[17].Width = 120;
                Student_Class_Wise_Extra_Analysis_Details_dataGridView1.Columns[18].Width = 120;
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

        public void PACSGFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Gender='" + Gender_CBox.Text + "' order by Class,Section,Gender Asc";
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

        public void PACGFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Gender='" + Gender_CBox.Text + "' order by Class,Section,Gender Asc";
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

        public void PAGFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Gender='" + Gender_CBox.Text + "' order by Class,Section,Gender Asc";
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

        public void PACSGCFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and Branch='" + Branch_CBox.Text + "' order by Class,Section,Gender Asc";
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

        public void PACGCFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Branch='" + Branch_CBox.Text + "' order by Class,Section,Gender Asc";
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

        public void PAGCFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Branch='" + Branch_CBox.Text + "' order by Class,Section,Gender Asc";
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

        public void PACSTFill_Grid()
        {
            try
            {
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and STerm='" + STerms_CBox.Text + "' order by Class,Section,Gender Asc";
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
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and Class='" + Class_CBox.Text + "' and STerm='" + STerms_CBox.Text + "' order by Class,Section,Gender Asc";
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
                query = "select * from Student_Admission_Master_Table where SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' and STerm='" + STerms_CBox.Text + "' order by Class,Section,Gender Asc";
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

        private void Student_Class_Wise_Extra_Analysis_Details_dataGridView1_CellValueNeeded(object sender, DataGridViewCellValueEventArgs e)
        {
            if (e.RowIndex >= 0 && e.ColumnIndex == 0)
            {
                e.Value = e.RowIndex + 1;
            }
        }

        private void Class_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            fill_Section_CBox();
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
                if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Gender_CHBox.Checked == false && Group_CHBox.Checked == false && STerm_CHBox.Checked == false)
                {
                    ACSFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Gender_CHBox.Checked == false && Group_CHBox.Checked == false && STerm_CHBox.Checked == false)
                {
                    ACFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Gender_CHBox.Checked == false && Group_CHBox.Checked == false && STerm_CHBox.Checked == false)
                {
                    AFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Gender_CHBox.Checked == true && Group_CHBox.Checked == false && STerm_CHBox.Checked == false)
                {
                    ACSGFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Gender_CHBox.Checked == true && Group_CHBox.Checked == false && STerm_CHBox.Checked == false)
                {
                    ACGFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Gender_CHBox.Checked == true && Group_CHBox.Checked == false && STerm_CHBox.Checked == false)
                {
                    AGFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Gender_CHBox.Checked == false && Group_CHBox.Checked == true && STerm_CHBox.Checked == false)
                {
                    ACSGCFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Gender_CHBox.Checked == false && Group_CHBox.Checked == true && STerm_CHBox.Checked == false)
                {
                    ACGCFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Gender_CHBox.Checked == false && Group_CHBox.Checked == true && STerm_CHBox.Checked == false)
                {
                    AGCFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Gender_CHBox.Checked == false && Group_CHBox.Checked == false && STerm_CHBox.Checked == true)
                {
                    ACSTFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Gender_CHBox.Checked == false && Group_CHBox.Checked == false && STerm_CHBox.Checked == true)
                {
                    ACTFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Gender_CHBox.Checked == false && Group_CHBox.Checked == false && STerm_CHBox.Checked == true)
                {
                    ATFill_Grid();
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
                if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Gender_CHBox.Checked == false && Group_CHBox.Checked == false && STerm_CHBox.Checked == false)
                {
                    PACSFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Gender_CHBox.Checked == false && Group_CHBox.Checked == false && STerm_CHBox.Checked == false)
                {
                    PACFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Gender_CHBox.Checked == false && Group_CHBox.Checked == false && STerm_CHBox.Checked == false)
                {
                    PAFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Gender_CHBox.Checked == true && Group_CHBox.Checked == false && STerm_CHBox.Checked == false)
                {
                    PACSGFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Gender_CHBox.Checked == true && Group_CHBox.Checked == false && STerm_CHBox.Checked == false)
                {
                    PACGFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Gender_CHBox.Checked == true && Group_CHBox.Checked == false && STerm_CHBox.Checked == false)
                {
                    PAGFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Gender_CHBox.Checked == false && Group_CHBox.Checked == true && STerm_CHBox.Checked == false)
                {
                    PACSGCFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Gender_CHBox.Checked == false && Group_CHBox.Checked == true && STerm_CHBox.Checked == false)
                {
                    PACGCFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Gender_CHBox.Checked == false && Group_CHBox.Checked == true && STerm_CHBox.Checked == false)
                {
                    PAGCFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Gender_CHBox.Checked == false && Group_CHBox.Checked == false && STerm_CHBox.Checked == true)
                {
                    PACSTFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Gender_CHBox.Checked == false && Group_CHBox.Checked == false && STerm_CHBox.Checked == true)
                {
                    PACTFill_Grid();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Gender_CHBox.Checked == false && Group_CHBox.Checked == false && STerm_CHBox.Checked == true)
                {
                    PATFill_Grid();
                }
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }              
    }
}
