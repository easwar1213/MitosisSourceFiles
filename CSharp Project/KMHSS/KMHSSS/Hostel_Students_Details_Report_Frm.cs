﻿using System;
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
    public partial class Hostel_Students_Details_Report_Frm : Form
    {
        string query,Accomm_Type="Hostel";
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Hostel_Students_Details_Report_Frm()
        {
            InitializeComponent();
        }

        private void View_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                if (Class_RBtn.Checked)
                {
                    if (Class_CBox.Text != "")
                    {
                        query = "select * from Student_Admission_Master_Table where Accomm_Type='" + Accomm_Type + "' and Class='" + Class_CBox.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' order by Class,Section,Gender,Std_Name Asc";
                        DataSet ds = new DataSet();
                        SqlDataAdapter da = new SqlDataAdapter(query, con);
                        con.Open();
                        da.Fill(ds, "Student_Admission_Master_Table");
                        con.Close();
                        CrystalReportHSR obj = new CrystalReportHSR();
                        obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                        crystalReportViewer1.ReportSource = obj;
                        obj.Refresh();
                        Class_CBox.Focus();
                    }
                    else
                    {
                        MessageBox.Show("Plz Choose Class");
                    }
                }
                if (All_RBtn.Checked)
                {
                    query = "select * from Student_Admission_Master_Table where Accomm_Type='" + Accomm_Type + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "' order by Class,Section,Gender,Std_Name Asc";
                    DataSet ds = new DataSet();
                    SqlDataAdapter da = new SqlDataAdapter(query, con);
                    con.Open();
                    da.Fill(ds, "Student_Admission_Master_Table");
                    con.Close();
                    CrystalReportHSR obj = new CrystalReportHSR();
                    obj.SetDataSource(ds.Tables["Student_Admission_Master_Table"]);
                    crystalReportViewer1.ReportSource = obj;
                    obj.Refresh();
                    Class_CBox.Focus();
                }
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message);
            }  
        }

        private void Hostel_Students_Details_Report_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                fill_Class_CBox();
                fill_AYear_CBox();
                Class_CBox.Focus();
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
        
        private void Class_RBtn_CheckedChanged(object sender, EventArgs e)
        {
            if (Class_RBtn.Checked)
            {
                Class_CBox.Visible = true;
            }
            else
            {
                Class_CBox.Visible = false;
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
    }
}
